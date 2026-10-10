import type { RefObject } from 'react'

import clsx from 'clsx'
import { Maximize2 } from 'lucide-react'
import { motion } from 'motion/react'

import { transition } from '@/features/player/constants/motion-transition'
import TrackCard from '@/shared/track-card'

import styles from './image.module.css'

interface ImageProps {
  className?: string
  imageRef: RefObject<HTMLImageElement | null>
  wrapperClassName?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Image = (props: ImageProps) => {
  const { imageRef, onClick, className, wrapperClassName } = props

  return (
    <motion.div
      className={clsx(styles.wrapper, wrapperClassName)}
      layoutId='img'
      transition={transition}
    >
      {onClick ? (
        <TrackCard.CoverAction
          cover={
            <TrackCard.Cover
              ref={imageRef}
              className={clsx(styles.image, className)}
              layoutId='img-inner'
              transition={transition}
            />
          }
          icon={<Maximize2 className={styles.icon} size={32} />}
          onClick={onClick}
        />
      ) : (
        <TrackCard.Cover
          ref={imageRef}
          className={clsx(styles.image, className)}
          layoutId='img-inner'
          transition={transition}
        />
      )}
    </motion.div>
  )
}

export default Image
