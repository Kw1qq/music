import type { ReactNode } from 'react'

import { AnimatePresence, motion } from 'motion/react'

interface AnimateProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Animate = (props: AnimateProps) => {
  const { children, className } = props

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        className={className}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        layout='position'
        transition={{ ease: 'circOut', duration: 0.2, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Animate
