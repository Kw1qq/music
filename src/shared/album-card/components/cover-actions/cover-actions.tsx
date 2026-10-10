import type { ReactNode } from 'react'

import { Loader } from '@mantine/core'
import clsx from 'clsx'

import Cover from '../cover'

import styles from './cover-actions.module.css'

interface CoverActionsProps {
  children?: ReactNode | ReactNode[]
  classNames?: {
    wrapper?: string
    cover?: string
    loader?: string
  }
  isLoading?: boolean
}

const CoverActions = (props: CoverActionsProps) => {
  const { classNames, children, isLoading } = props

  return (
    <div className={clsx(styles.wrapper, classNames?.wrapper)}>
      <Cover className={clsx(styles.cover, classNames?.cover)} />
      <div className={styles.overlay}>
        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader className={clsx(styles.loader, classNames?.loader)} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default CoverActions
