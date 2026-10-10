import type { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './wrapper.module.css'

interface WrapperProps {
  children: ReactNode | ReactNode[]
  classname?: string
}

const Wrapper = (props: WrapperProps) => {
  const { children, classname } = props

  return <div className={clsx(styles.wrapper, classname)}>{children}</div>
}
export default Wrapper
