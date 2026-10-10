import { Howl } from 'howler'
import { jwtDecode } from 'jwt-decode'

import { BASE_URL } from '@/api/constants/base-url'
import { getTrackStreamToken } from '@/api/tracks/get-track-stream-token'
import { postPlayTrack } from '@/api/tracks/post-play-track'

import { cacheTrackForOffline } from '../utils/cache-track-for-offline'
import { updateMediaSession } from '../utils/update-media-session'
import { usePlayerStore } from './use-player-store'

interface PlayerEngineCallbacks {
  onEnd: () => void
  onPause: () => void
  onPlay: (duration: number) => void
  onProgress: (percent: number) => void
  setSound: (sound: Howl) => void
}

interface PlayOptions {
  format?: string
  loop: boolean
  volume: number
}

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

const TOKEN_REFRESH_MARGIN_MS = 1_000

export class PlayerEngine {
  sound: Howl | null = null
  private tickingRafId: number | null = null
  private tokenRefreshRafId: number | null = null
  private callbacks: PlayerEngineCallbacks
  private isRecovering: boolean = false
  private playRequestId = 0

  constructor(callbacks: PlayerEngineCallbacks) {
    this.callbacks = callbacks
  }

  async play(trackId: string, options: PlayOptions) {
    const requestId = ++this.playRequestId

    if (this.sound?.playing()) {
      const sound = this.sound
      sound.fade(this.sound.volume(), 0, 300)
      sound.once('fade', () => {
        sound?.unload()
      })
    } else {
      this.sound?.unload()
    }

    this.stopTicking()
    this.clearTokenRefreshTimer()

    const token = await getTrackStreamToken(trackId)

    if (requestId !== this.playRequestId) {
      return
    }

    const sound = this.createSound(trackId, token, 0, options, requestId)

    updateMediaSession(trackId)
    postPlayTrack(trackId)
    sound.play()
  }

  togglePlay() {
    if (!this.sound) {
      return
    }

    if (this.sound.playing()) {
      navigator.mediaSession.playbackState = 'paused'
      this.sound.pause()
    } else {
      navigator.mediaSession.playbackState = 'playing'
      this.sound.play()
    }
  }

  seek(percent: number, duration: number) {
    if (!this.sound || !duration) {
      return
    }

    this.sound.seek((percent / 100) * duration)
    this.reportProgress(duration)
  }

  rewind(duration: number) {
    if (!this.sound) {
      return
    }

    const next = (this.sound.seek() as number) - 5
    this.sound.seek(next < 0 ? 0 : next)
    this.reportProgress(duration)
  }

  forward(duration: number) {
    if (!this.sound) {
      return
    }

    const next = (this.sound.seek() as number) + 5
    this.sound.seek(next > duration ? duration : next)
    this.reportProgress(duration)
  }

  setVolume(volume: number) {
    if (!isMobile) {
      this.sound?.volume(volume)
    }
  }

  setLoop(loop: boolean) {
    this.sound?.loop(loop)
  }

  private createSound(
    trackId: string,
    token: string,
    resumeAt = 0,
    options: PlayOptions,
    requestId: number
  ) {
    const { format = 'mp3', volume, loop } = options

    const sound = new Howl({
      src: [`${BASE_URL}/tracks/${trackId}/stream?token=${token}`],
      format: [format],
      html5: true,
      volume: isMobile ? 1 : volume,
      loop,
      onplay: () => {
        this.callbacks.onPlay(sound.duration())
        this.startTicking()

        if (usePlayerStore.getState().shouldCacheTrack) {
          cacheTrackForOffline(`${BASE_URL}/tracks/${trackId}/stream?token=${token}`)
        }
      },
      onpause: () => {
        this.stopTicking()
        this.callbacks.onPause()
      },
      onend: () => {
        this.stopTicking()
        this.clearTokenRefreshTimer()
        this.callbacks.onEnd()
      }
    })

    if (resumeAt > 0) {
      sound.once('load', () => sound.seek(resumeAt))
    }

    this.sound = sound
    this.callbacks.setSound(sound)
    this.scheduleTokenRefresh(trackId, token, sound, options, requestId)

    return sound
  }

  private scheduleTokenRefresh(
    trackId: string,
    token: string,
    oldSound: Howl,
    options: PlayOptions,
    requestId: number
  ) {
    let expiresAtMs: number = 0
    try {
      const { exp } = jwtDecode<{ exp: number }>(token)
      expiresAtMs = exp * 1000
    } catch {
      return
    }

    const tick = () => {
      if (requestId !== this.playRequestId) {
        this.clearTokenRefreshTimer()
        return
      }

      const shouldRefreshToken = expiresAtMs - Date.now() < TOKEN_REFRESH_MARGIN_MS

      if (shouldRefreshToken) {
        this.refreshTokenInPlace(trackId, oldSound, options, requestId)
      }

      this.tokenRefreshRafId = requestAnimationFrame(tick)
    }
    this.tokenRefreshRafId = requestAnimationFrame(tick)
  }

  private clearTokenRefreshTimer() {
    if (this.tokenRefreshRafId !== null) {
      cancelAnimationFrame(this.tokenRefreshRafId)
      this.tokenRefreshRafId = null
    }
  }

  private async refreshTokenInPlace(
    trackId: string,
    oldSound: Howl,
    options: PlayOptions,
    requestId: number
  ) {
    if (this.isRecovering) {
      return
    }
    this.isRecovering = true

    const position = oldSound.seek() || 0
    const wasPlaying = oldSound.playing()

    try {
      const token = await getTrackStreamToken(trackId)

      if (requestId !== this.playRequestId || this.sound !== oldSound) {
        return
      }

      oldSound.unload()
      this.clearTokenRefreshTimer()
      const newSound = this.createSound(trackId, token, position, options, requestId)
      newSound.once('load', () => {
        if (requestId !== this.playRequestId || this.sound !== newSound) {
          return
        }

        newSound.seek(position)
        if (wasPlaying) {
          newSound.play()
        }
        this.isRecovering = false
      })
    } catch (err) {
      console.error('Не удалось проактивно обновить stream-токен:', err)
      this.isRecovering = false
    }
  }

  private reportProgress(duration: number) {
    if (!this.sound || !duration) {
      return
    }

    this.callbacks.onProgress(this.sound.seek())
  }

  private startTicking = () => {
    if (this.tickingRafId !== null) {
      return
    }
    const tick = () => {
      if (this.sound?.playing()) {
        const duration = this.sound.duration()
        if (duration) this.reportProgress(duration)
      }
      this.tickingRafId = requestAnimationFrame(tick)
    }
    this.tickingRafId = requestAnimationFrame(tick)
  }

  private stopTicking() {
    if (this.tickingRafId !== null) {
      cancelAnimationFrame(this.tickingRafId)
      this.tickingRafId = null
    }
  }
}
