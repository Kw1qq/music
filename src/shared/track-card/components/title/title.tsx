import type { ReactNode, RefObject } from 'react'

import clsx from 'clsx'
import { use } from 'react'

import { Context } from '../context'

import styles from './title.module.css'

interface TitleProps {
  children?: ReactNode
  className?: string
  ref?: RefObject<HTMLParagraphElement | null>
}

const Title = (props: TitleProps) => {
  const { className, children, ref } = props

  let title = children

  if (title === undefined) {
    const context = use(Context)

    if (!context) {
      throw new Error('Контекст не найден, а children не переданы')
    }

    title = context.title
  }

  return (
    <p ref={ref} className={clsx(styles.title, className)}>
      {title}
    </p>
  )
}

export default Title
