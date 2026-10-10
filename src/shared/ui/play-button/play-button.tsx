import type { ComponentProps } from 'react'

import clsx from 'clsx'
import { Play } from 'lucide-react'

import styles from './play-button.module.css'

interface PlayButtonProps extends ComponentProps<'button'> {
  className?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PlayButton = (props: PlayButtonProps) => {
  const { className, onClick, ...restProps } = props

  return (
    <button {...restProps} className={clsx(styles.button, className)} onClick={onClick}>
      <Play size={24} />
    </button>
  )
}

export default PlayButton
