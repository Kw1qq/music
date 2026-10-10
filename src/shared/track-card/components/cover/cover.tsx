import type { MotionProps } from 'motion/react'
import type { RefObject } from 'react'

import clsx from 'clsx'
import { motion } from 'motion/react'
import { use } from 'react'

import { BASE_URL } from '@/api/constants/base-url'
import { getSignedMediaUrl } from '@/utils/get-signed-media-url'

import { Context } from '../context'

import styles from './cover.module.css'

interface CoverProps extends MotionProps {
  className?: string
  ref?: RefObject<HTMLImageElement | null>
  src?: string
}

const Cover = (props: CoverProps) => {
  const { className, ref, src, ...restProps } = props

  let coverUrl = src
  if (coverUrl === undefined) {
    const context = use(Context)

    if (!context) {
      throw new Error('Контекст не найден, а src не передан')
    }

    coverUrl = context.cover ?? undefined
  }

  const srcWithToken = getSignedMediaUrl(`${BASE_URL}${coverUrl}`)

  return (
    <motion.img
      {...restProps}
      ref={ref}
      alt='Обложка'
      className={clsx(styles.image, className)}
      crossOrigin='anonymous'
      height={60}
      src={srcWithToken}
      width={60}
    />
  )
}

export default Cover
