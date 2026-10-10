import type { ComponentProps, ReactNode } from 'react'

import clsx from 'clsx'

import styles from './cover-action.module.css'

export interface CoverActionProps {
  buttonProps?: ComponentProps<'button'>
  classNames?: {
    button?: string
    icon?: string
    coverWrapper?: string
  }
  cover: ReactNode
  icon: ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CoverAction = (props: CoverActionProps) => {
  const { buttonProps, onClick, cover, classNames, icon } = props

  return (
    <button {...buttonProps} className={clsx(styles.button, classNames?.button)} onClick={onClick}>
      <div className={clsx(styles.coverWrapper, classNames?.coverWrapper)}>{cover}</div>
      <div className={clsx(styles.icon, classNames?.icon)}>{icon}</div>
    </button>
  )
}

export default CoverAction
