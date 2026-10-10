import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Track } from '@/api/types/track'

import { generateId } from '@/utils/generate-id'
import { shuffleArray } from '@/utils/shuffle-array'

import { setupMediaSessionHandlers } from '../utils/setup-media-session-handlers'
import { PlayerEngine } from './player-engine'

export interface QueueItem {
  queueItemId: string
  trackId: Track['id']
}

export interface IUsePlayerStore {
  currentTrackId: string | null
  currentTrackIndex: number | null
  duration: number
  hasNext: boolean
  hasPrev: boolean
  howl: Howl | null
  isMuting: boolean
  isPlaying: boolean
  isShuffling: boolean
  originalQueue: QueueItem[]
  prevVolume: number
  progress: number
  queue: QueueItem[]
  repeatMode: 'none' | 'repeat-queue' | 'repeat'
  shouldCacheTrack: boolean
  volume: number

  addNext: (tracksId: string[]) => void

  addToEnd: (tracksId: string[]) => void
  changeVolume: (volume: number) => void
  forward: () => void
  next: () => void
  play: (track: number, format?: string) => void

  playQueue: (trackIds: string[], startIndex: number) => void
  playShuffled: (trackIds: string[]) => void
  playTrack: (trackId: string, format?: string) => void
  prev: () => void
  removeFromQueue: ({ queueItemId, trackId }: { queueItemId?: string; trackId?: string }) => void
  reorderQueue: (newQueue: QueueItem[]) => void

  rewind: () => void
  seek: (percent: number) => void

  setPrevVolume: (volume: number) => void
  setQueue: (trackIds: string[]) => void
  setShouldCacheTrack: (shouldCache: boolean) => void
  toggleMute: () => void
  togglePlay: () => void
  toggleRepeat: () => void
  toggleShuffle: () => void
}

function toQueueItems(trackIds: string[]): QueueItem[] {
  return trackIds.map((trackId) => ({
    queueItemId: generateId(),
    trackId
  }))
}

export const usePlayerStore = create<IUsePlayerStore>()(
  persist(
    (set, get) => {
      const engine = new PlayerEngine({
        onPlay: (duration) => set({ isPlaying: true, duration }),
        onPause: () => set({ isPlaying: false }),
        onProgress: (time) => set({ progress: time }),
        onEnd: () => {
          const { repeatMode, next, play, queue, currentTrackIndex } = get()
          set({ isPlaying: false, progress: 0 })

          if (currentTrackIndex === null) {
            return
          }

          if (repeatMode === 'repeat') {
            play(currentTrackIndex)
            return
          }

          if (repeatMode === 'repeat-queue' && currentTrackIndex === queue.length - 1) {
            play(0)
            return
          }

          next()
        },
        setSound: (sound: Howl) => {
          set({ howl: sound })
        }
      })

      return {
        currentTrackId: null,
        currentTrackIndex: null,
        isPlaying: false,
        progress: 0,
        duration: 0,
        repeatMode: 'none',
        volume: 50,
        isMuting: false,
        prevVolume: 50,
        queue: [],
        originalQueue: [],
        hasNext: false,
        hasPrev: false,
        isShuffling: false,
        displayMode: 'cover',
        howl: engine.sound,
        shouldCacheTrack: false,

        play: (index, format = 'mp3') => {
          const { queue, volume, repeatMode } = get()
          const item = queue[index]
          if (!item) return

          set({
            currentTrackId: item.trackId,
            currentTrackIndex: index,
            progress: 0,
            hasNext: index + 1 < queue.length,
            hasPrev: index - 1 >= 0
          })

          engine.play(item.trackId, {
            format,
            volume: volume / 100,
            loop: repeatMode === 'repeat'
          })
        },

        playTrack: (trackId, format = 'mp3') => {
          const { volume, repeatMode } = get()
          const tracks = toQueueItems([trackId])

          set({
            queue: tracks,
            originalQueue: tracks,
            currentTrackId: trackId,
            currentTrackIndex: 0,
            progress: 0,
            hasNext: false,
            hasPrev: false
          })

          engine.play(trackId, { format, volume: volume / 100, loop: repeatMode === 'repeat' })
        },

        playQueue: (trackIds, startIndex) => {
          const { isShuffling, play } = get()
          const items = toQueueItems(trackIds)

          if (isShuffling) {
            const shuffled = shuffleArray(items)
            const item = shuffled.find(({ trackId }) => trackId === trackIds[startIndex])
            const newShuffled = shuffled.filter(({ trackId }) => trackId !== trackIds[startIndex])

            set({ originalQueue: items, queue: item ? [item, ...newShuffled] : newShuffled })
            play(0)
          } else {
            set({ originalQueue: items, queue: items })
            play(startIndex)
          }
        },

        playShuffled: (trackIds) => {
          const { play } = get()
          if (trackIds.length === 0) return

          const items = toQueueItems(trackIds)
          const shuffled = shuffleArray(items)

          set({ originalQueue: items, queue: shuffled, isShuffling: true })
          play(0)
        },

        setQueue: (trackIds) => {
          const { currentTrackId } = get()
          const items = toQueueItems(trackIds)

          const trackIndex = currentTrackId
            ? items.findIndex((item) => item.trackId === currentTrackId)
            : -1

          set({
            queue: items,
            hasNext: trackIndex !== -1 && trackIndex + 1 < items.length,
            hasPrev: trackIndex !== -1 && trackIndex - 1 >= 0,
            currentTrackIndex: trackIndex !== -1 ? trackIndex : null
          })
        },

        next: () => {
          const { play, hasNext, currentTrackIndex } = get()
          if (hasNext && currentTrackIndex !== null) {
            play(currentTrackIndex + 1)
          }
        },

        prev: () => {
          const { play, hasPrev, currentTrackIndex } = get()
          if (hasPrev && currentTrackIndex !== null) {
            play(currentTrackIndex - 1)
          }
        },

        addNext: (tracksId) => {
          const { queue, currentTrackIndex } = get()
          if (currentTrackIndex === null) {
            return
          }

          const newItems = toQueueItems(tracksId)
          const newQueue = queue.toSpliced(currentTrackIndex + 1, 0, ...newItems)

          set({
            queue: newQueue,
            originalQueue: newQueue,
            hasNext: currentTrackIndex + 1 < newQueue.length
          })
        },

        addToEnd: (tracksId) => {
          const { queue, currentTrackIndex } = get()
          if (currentTrackIndex === null) {
            return
          }

          const newItems = toQueueItems(tracksId)
          const newQueue = [...queue, ...newItems]

          set({
            queue: newQueue,
            originalQueue: newQueue,
            hasNext: currentTrackIndex + 1 < newQueue.length
          })
        },

        removeFromQueue: ({ queueItemId, trackId }) => {
          const { queue, currentTrackIndex, play, currentTrackId } = get()
          let removeIndex = queue.findIndex((item) => item.queueItemId === queueItemId)
          if (trackId) {
            removeIndex = queue.findIndex((item) => item.trackId === trackId)
          }
          if (removeIndex === -1) {
            return
          }

          let newQueue = queue.filter((item) => item.queueItemId !== queueItemId)
          if (trackId) {
            newQueue = queue.filter((item) => item.trackId !== trackId)
          }

          let newIndex =
            currentTrackIndex === null
              ? null
              : removeIndex < currentTrackIndex
                ? currentTrackIndex - 1
                : currentTrackIndex
          if (newIndex !== null) {
            newIndex = Math.max(Math.min(newIndex, newQueue.length - 1), 0)
          }

          if (
            newIndex !== null &&
            (currentTrackId === trackId ||
              queue.find((t) => t.queueItemId === queueItemId)?.trackId === currentTrackId)
          ) {
            set({
              queue: newQueue
            })
            play(newIndex)
          }

          set({
            queue: newQueue,
            currentTrackIndex: newIndex,
            hasNext: newIndex !== null && newIndex + 1 < newQueue.length,
            hasPrev: newIndex !== null && newIndex - 1 >= 0
          })
        },

        reorderQueue: (newQueue) => {
          const { queue, currentTrackIndex } = get()

          const currentItem = currentTrackIndex !== null ? queue[currentTrackIndex] : null
          const newIndex = currentItem
            ? newQueue.findIndex((item) => item.queueItemId === currentItem.queueItemId)
            : null

          set({
            queue: newQueue,
            currentTrackIndex: newIndex,
            hasNext: newIndex !== null && newIndex + 1 < newQueue.length,
            hasPrev: newIndex !== null && newIndex - 1 >= 0
          })
        },

        togglePlay: () => engine.togglePlay(),

        toggleRepeat: () => {
          const { repeatMode } = get()
          const modes = ['none', 'repeat-queue', 'repeat'] as const
          const nextMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length]

          set({ repeatMode: nextMode })
          engine.setLoop(nextMode === 'repeat')
        },

        toggleShuffle: () => {
          const { isShuffling, originalQueue, currentTrackIndex, queue } = get()
          const willShuffle = !isShuffling

          if (originalQueue.length === 0) {
            set({ isShuffling: willShuffle })
            return
          }

          const currentItem = currentTrackIndex !== null ? queue[currentTrackIndex] : null

          let newQueue: QueueItem[]
          if (willShuffle) {
            const idx = originalQueue.findIndex(
              (item) => item.queueItemId === currentItem?.queueItemId
            )
            const rest =
              idx !== -1
                ? [...originalQueue.slice(0, idx), ...originalQueue.slice(idx + 1)]
                : [...originalQueue]

            newQueue = currentItem ? [currentItem, ...shuffleArray(rest)] : shuffleArray(rest)
          } else {
            newQueue = originalQueue
          }

          const newIndex = currentItem
            ? newQueue.findIndex((item) => item.queueItemId === currentItem.queueItemId)
            : null

          set({
            isShuffling: willShuffle,
            queue: newQueue,
            currentTrackIndex: newIndex,
            hasNext: newIndex !== null && newIndex + 1 < newQueue.length,
            hasPrev: newIndex !== null && newIndex - 1 >= 0
          })
        },

        seek: (percent) => engine.seek(percent, get().duration),
        rewind: () => engine.rewind(get().duration),
        forward: () => engine.forward(get().duration),

        changeVolume: (volume) => {
          engine.setVolume(volume / 100)
          set({ volume, isMuting: volume === 0 })
        },

        toggleMute: () => {
          const { changeVolume, isMuting, prevVolume } = get()
          changeVolume(isMuting ? prevVolume : 0)
          set({ isMuting: !isMuting })
        },

        setPrevVolume: (volume) => set({ prevVolume: volume }),
        setShouldCacheTrack: (shouldCache) => set({ shouldCacheTrack: shouldCache })
      }
    },
    {
      name: 'player',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        volume: state.volume,
        prevVolume: state.prevVolume,
        isMuting: state.isMuting,
        shouldCacheTrack: state.shouldCacheTrack
      })
    }
  )
)

setupMediaSessionHandlers(usePlayerStore)
