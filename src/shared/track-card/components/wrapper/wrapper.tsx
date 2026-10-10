import type { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './wrapper.module.css'

interface WrapperProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Wrapper = (props: WrapperProps) => {
  const { children, className } = props

  return <div className={clsx(styles.wrapper, className)}>{children}</div>
}

export default Wrapper
