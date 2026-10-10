import type { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './data.module.css'

interface DataProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Data = (props: DataProps) => {
  const { children, className } = props

  return <div className={clsx(styles.data, className)}>{children}</div>
}

export default Data
