import { useHotkeys } from '@mantine/hooks'
import { useCallback, useEffect, useId, useState } from 'react'

import { useIsTouch } from './use-is-touch'

let stack: string[] = []

export const useExpanded = (initial: boolean = false) => {
  const id = useId()
  const [isExpanded, setIsExpanded] = useState(initial)

  const isTouch = useIsTouch()

  useEffect(
    () => () => {
      stack = stack.filter((m) => m !== id)
    },
    [id]
  )

  useEffect(() => {
    if (!isExpanded || !isTouch) {
      return
    }

    window.history.pushState({ modal: id }, '')

    const handlePopState = () => {
      if (window.history.state?.modal === id) {
        return
      }
      setIsExpanded(false)
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isExpanded, isTouch, id])

  const open = useCallback(() => {
    setIsExpanded(true)
    stack.push(id)
  }, [id])

  const close = useCallback(() => {
    setIsExpanded(false)
    stack.pop()

    if (isTouch && window.history.state?.modal === id) {
      window.history.back()
    }
  }, [isTouch, id])

  useHotkeys([
    [
      'esc',
      () => {
        if (stack[stack.length - 1] === id) {
          close()
        }
      }
    ]
  ])

  return { isExpanded, open, close }
}
