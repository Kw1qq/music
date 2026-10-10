import type { RefObject } from 'react'

import { useEffect, useEffectEvent, useState } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { calculatePercent } from '../utils/calculate-percent'

interface useProgressBarArgs {
  tooltipRef: RefObject<HTMLDivElement | null>
  trackRef: RefObject<HTMLDivElement | null>
}

export const useTooltip = ({ tooltipRef, trackRef }: useProgressBarArgs) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [moveProgressPercent, setMoveProgressPercent] = useState(0)
  const duration = usePlayerStore((state) => state.duration)

  const moveProgress = (moveProgressPercent / 100) * duration

  const handlePointerMove = useEffectEvent((e: PointerEvent) => {
    const percent = calculatePercent(e.clientX, trackRef.current)

    if (e.pointerType === 'mouse' || isTooltipVisible) {
      setMoveProgressPercent(percent)
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${percent}%`
        tooltipRef.current.style.opacity = '1'
      }
    }
  })

  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const handlePointerDown = () => {
      setIsTooltipVisible(true)
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setIsTooltipVisible(false)
      }
    }

    const handleMouseEnter = (e: PointerEvent) => {
      if (e.target === trackRef.current) {
        setIsTooltipVisible(true)
      }
    }
    const handleMouseLeave = (e: PointerEvent) => {
      if (e.target === trackRef.current) {
        setIsTooltipVisible(false)
      }
    }

    trackRef.current.addEventListener('pointerdown', handlePointerDown)
    trackRef.current.addEventListener('pointermove', handlePointerMove)
    trackRef.current.addEventListener('pointerup', handlePointerUp)
    trackRef.current.addEventListener('pointerover', handleMouseEnter)
    trackRef.current.addEventListener('pointerout', handleMouseLeave)

    return () => {
      if (!trackRef.current) {
        return
      }

      trackRef.current.removeEventListener('pointerdown', handlePointerDown)
      trackRef.current.removeEventListener('pointermove', handlePointerMove)
      trackRef.current.removeEventListener('pointerup', handlePointerUp)
      trackRef.current.removeEventListener('pointerover', handleMouseEnter)
      trackRef.current.removeEventListener('pointerout', handleMouseLeave)
    }
  }, [])

  return {
    isTooltipVisible,
    moveProgressPercent,
    moveProgress
  }
}
