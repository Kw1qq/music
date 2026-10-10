import type { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './title.module.css'

interface TitleProps {
  children: ReactNode
  className?: string
}

const Title = (props: TitleProps) => {
  const { className, children } = props

  return <h2 className={clsx(styles.title, className)}>{children}</h2>
}

export default Title
