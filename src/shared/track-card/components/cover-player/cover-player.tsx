import type { ReactNode } from 'react'

import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'
import { mergeClassNamesObject } from '@/utils/merge-class-names-object'

import type { CoverActionProps } from '../cover-action/cover-action'

import { useTrackContext } from '../context'
import CoverAction from '../cover-action'

import styles from './cover-player.module.css'

export interface CoverPlayerProps {
  classNames?: CoverActionProps['classNames']
  cover: ReactNode
  onPlay: () => void
}

const CoverPlayer = (props: CoverPlayerProps) => {
  const { classNames, onPlay, cover } = props

  const { id } = useTrackContext()

  const [isHover, setIsHover] = useState(false)

  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const togglePlay = usePlayerStore((state) => state.togglePlay)

  const isCurrentTrack = currentTrackId === id
  const isCurrentTrackPlaying = isCurrentTrack && isPlaying

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (isCurrentTrack) {
      togglePlay()
    } else {
      onPlay()
    }
  }

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      return
    }

    setIsHover(true)
  }

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      return
    }

    setIsHover(false)
  }

  const renderIcon = () => {
    if (isCurrentTrackPlaying && !isHover) {
      return <div className={styles.dot} />
    }

    if (isCurrentTrack) {
      return isPlaying ? <Pause size={24} /> : <Play className={styles.play} size={24} />
    }

    return <Play size={24} />
  }

  return (
    <CoverAction
      buttonProps={{
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave
      }}
      classNames={mergeClassNamesObject(classNames, { button: styles.button })}
      cover={cover}
      icon={renderIcon()}
      onClick={handleClick}
    />
  )
}

export default CoverPlayer
