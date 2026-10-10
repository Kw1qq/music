import type { ReactNode } from 'react'

import clsx from 'clsx'
import { motion } from 'motion/react'

import styles from './header.module.css'

interface HeaderProps {
  children: ReactNode
  className?: string
}

const Header = (props: HeaderProps) => {
  const { children, className } = props

  return (
    <motion.div
      animate={{ height: 'auto', opacity: 1 }}
      className={styles.container}
      exit={{ height: 0, opacity: 0 }}
      initial={{ height: 0, opacity: 0 }}
      layout='size'
    >
      <div className={clsx(styles.inner, className)}>{children}</div>
    </motion.div>
  )
}

export default Header
