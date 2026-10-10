import type { RefObject } from 'react'

import { useEffect, useEffectEvent, useState } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { calculatePercent } from '../utils/calculate-percent'

interface useDragProgressBarArgs {
  trackRef: RefObject<HTMLDivElement | null>
}

export const useDragProgress = ({ trackRef }: useDragProgressBarArgs) => {
  const seek = usePlayerStore((state) => state.seek)
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)

  const [isDragging, setIsDragging] = useState(false)
  const [dragProgressPercent, setDragProgressPercent] = useState(0)

  const progressPercent = (progress * 100) / duration
  const displayProgressPercent = isDragging ? dragProgressPercent : progressPercent

  const handlePointerMove = useEffectEvent((e: PointerEvent) => {
    const percent = calculatePercent(e.clientX, trackRef.current)

    if (isDragging) {
      setDragProgressPercent(percent)
    }
  })

  const handlePointerUp = useEffectEvent((e: PointerEvent) => {
    if (!isDragging) {
      return
    }
    const percent = calculatePercent(e.clientX, trackRef.current)
    seek(percent)
    setIsDragging(false)
  })

  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.currentTarget as HTMLElement
      if (target) {
        target.setPointerCapture(e.pointerId)
      }

      setIsDragging(true)
      setDragProgressPercent(calculatePercent(e.clientX, trackRef.current))
    }

    trackRef.current.addEventListener('pointerdown', handlePointerDown)
    trackRef.current.addEventListener('pointermove', handlePointerMove)
    trackRef.current.addEventListener('pointerup', handlePointerUp)

    return () => {
      if (!trackRef.current) {
        return
      }

      trackRef.current.removeEventListener('pointerdown', handlePointerDown)
      trackRef.current.removeEventListener('pointermove', handlePointerMove)
      trackRef.current.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return {
    displayProgressPercent
  }
}
