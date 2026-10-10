import type { PointerEventHandler } from 'react'

import { useEffect, useState } from 'react'

export const usePointerInteraction = () => {
  const [isInteractingWithControl, setIsInteractingWithControl] = useState(false)

  useEffect(() => {
    if (!isInteractingWithControl) {
      return
    }
    const handleUp = () => {
      setIsInteractingWithControl(false)
    }
    window.addEventListener('pointerup', handleUp)
    return () => window.removeEventListener('pointerup', handleUp)
  }, [isInteractingWithControl])

  const handlerPointerDownCapture: PointerEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.closest('[data-no-drag]')) {
      setIsInteractingWithControl(true)
    }
  }

  return {
    isInteractingWithControl,
    handlerPointerDownCapture
  }
}
