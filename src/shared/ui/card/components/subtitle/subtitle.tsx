import type { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './subtitle.module.css'

interface SubtitleProps {
  children: ReactNode
  className?: string
}

const Subtitle = (props: SubtitleProps) => {
  const { className, children } = props

  return <p className={clsx(styles.subtitle, className)}>{children}</p>
}

export default Subtitle
