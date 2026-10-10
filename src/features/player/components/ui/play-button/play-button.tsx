import clsx from 'clsx'
import { Pause, Play } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './play-button.module.css'

interface PlayButtonProps {
  className?: string
}

const PlayButton = (props: PlayButtonProps) => {
  const { className } = props

  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const togglePlay = usePlayerStore((state) => state.togglePlay)

  const handleClick = (e: React.MouseEvent) => {
    togglePlay()
    e.stopPropagation()
  }

  return (
    <button className={clsx(styles.button, className)} onClick={handleClick}>
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </button>
  )
}

export default PlayButton
