import type { ReactNode } from 'react'

import { Marquee } from '@mantine/core'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import TrackCard from '@/shared/track-card'

import styles from './title.module.css'

interface TitleProps {
  children?: ReactNode
  className?: string
}

const Title = (props: TitleProps) => {
  const { className, children } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    if (!textRef.current || !wrapperRef.current) {
      return
    }

    const containerWidth = wrapperRef.current.offsetWidth
    const contentEl = textRef.current
    const textWidth = contentEl?.scrollWidth ?? 0

    if (containerWidth) {
      setShouldScroll(textWidth > containerWidth)
    }
  })

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {shouldScroll ? (
        <Marquee
          classNames={{ content: styles.content, root: styles.marquee }}
          duration={15000}
          fadeEdges={false}
          gap={40}
          repeat={2}
        >
          <TrackCard.Title ref={textRef} className={clsx(styles.title, className)} />
        </Marquee>
      ) : (
        <TrackCard.Title ref={textRef} className={clsx(styles.title, className)} />
      )}
      {children}
    </div>
  )
}

export default Title
