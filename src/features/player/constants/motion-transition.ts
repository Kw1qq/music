import type { Transition } from 'motion/react'

export const transition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 1
}
