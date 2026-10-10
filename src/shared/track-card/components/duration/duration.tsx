import clsx from 'clsx'
import { use } from 'react'

import { formatSeconds } from '@/utils/format-seconds'

import { Context } from '../context'

import styles from './duration.module.css'

interface DurationProps {
  children?: number
  className?: string
}

const Duration = (props: DurationProps) => {
  const { className, children } = props

  let duration = children

  if (duration === undefined) {
    const context = use(Context)

    if (!context) {
      throw new Error('Контекст не найден, а children не переданы')
    }

    duration = context.duration ?? 0
  }

  return <p className={clsx(styles.duration, className)}>{formatSeconds(duration)}</p>
}

export default Duration
