import type { ReactNode } from 'react'

import clsx from 'clsx'

import Animate from '../animate'

import styles from './actions.module.css'

interface ActionsProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Actions = (props: ActionsProps) => {
  const { children, className } = props

  return <Animate className={clsx(styles.actions, className)}>{children}</Animate>
}

export default Actions
