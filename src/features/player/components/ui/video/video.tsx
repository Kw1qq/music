import { Loader } from '@mantine/core'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { BASE_URL } from '@/api/constants/base-url'
import { useAuthStore } from '@/features/auth/use-auth-store'
import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './video.module.css'

const Video = () => {
  const progress = usePlayerStore((state) => state.progress)
  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const { streamToken } = useAuthStore((state) => state.auth)

  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handlePlaying = () => setIsLoading(false)

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('playing', handlePlaying)

    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('playing', handlePlaying)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (!isPlaying) {
      video.pause()
      return
    }

    if (isLoading) {
      return
    }

    video.play().catch((err) => {
      if (err.name !== 'AbortError') {
        console.error('Video play error:', err)
      }
    })
  }, [isPlaying, isLoading, currentTrackId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (Math.abs(progress - video.currentTime) > 0.3 && !isLoading) {
      video.currentTime = progress
    }
  }, [progress, isLoading])

  const src = `${BASE_URL}/tracks/${currentTrackId}/video?token=${streamToken}`

  return (
    <div className={styles.wrapper}>
      <video
        playsInline
        ref={videoRef}
        className={clsx(styles.video, isLoading && styles.videoLoading)}
        muted={true}
        preload='metadata'
        src={src}
      />
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader className={styles.loader} />
        </div>
      )}
    </div>
  )
}

export default Video
