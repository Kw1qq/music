import type { CSSProperties } from 'react'

import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'motion/react'

import { useContainerContext } from '@/routes/-layout/content/content'

import styles from './background.module.css'

interface BackgroundProps {
  className?: string
  style?: CSSProperties
}

const Background = (props: BackgroundProps) => {
  const { className, style } = props

  const containerRef = useContainerContext()

  const { scrollY } = useScroll({
    container: { current: containerRef }
  })

  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <motion.div
      className={clsx(styles.background, className)}
      initial={{ opacity: 1 }}
      style={{ ...style, opacity }}
    />
  )
}

export default Background
