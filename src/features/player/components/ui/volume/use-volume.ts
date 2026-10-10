import { useHotkeys } from '@mantine/hooks'
import { useRef } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useDragStore } from '@/stores/use-drag-store'

export const useVolume = () => {
  const volume = usePlayerStore((state) => state.volume)
  const changeVolume = usePlayerStore((state) => state.changeVolume)
  const setPrevVolume = usePlayerStore((state) => state.setPrevVolume)
  const toggleMute = usePlayerStore((state) => state.toggleMute)
  const isStartChangeRef = useRef(true)
  const isDragging = useDragStore((state) => state.isDragging)

  useHotkeys(
    [
      [
        'ArrowUp',
        () => {
          if (!isDragging) {
            changeVolume(volume + 5)
          }
        }
      ],
      [
        'ArrowDown',
        () => {
          if (!isDragging) {
            changeVolume(volume - 5)
          }
        }
      ],
      ['m', toggleMute, { usePhysicalKeys: true }]
    ],
    ['INPUT', 'TEXTAREA']
  )

  const handlerChangeEnd = (volume: number) => {
    isStartChangeRef.current = true
    if (volume > 0) {
      setPrevVolume(volume)
    }
  }
  const handlerChange = (volume: number) => {
    if (isStartChangeRef.current) {
      setPrevVolume(volume)
      isStartChangeRef.current = false
    }
    changeVolume(volume)
  }

  return {
    volume,
    handlerChangeEnd,
    handlerChange
  }
}
