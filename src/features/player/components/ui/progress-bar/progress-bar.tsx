import clsx from 'clsx'

import { formatSeconds } from '@/utils/format-seconds'

import { usePlayerStore } from '../../../core/use-player-store'
import Animate from '../animate'
import Bar from './components'

import styles from './progress-bar.module.css'

interface ProgressBarProps {
  className?: string
}

const ProgressBar = (props: ProgressBarProps) => {
  const { className } = props

  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)

  return (
    <Animate className={clsx(styles.wrapper, className)}>
      <span className={styles.number}>{formatSeconds(progress)}</span>
      <Bar />
      <span className={styles.number}>{formatSeconds(duration)}</span>
    </Animate>
  )
}

export default ProgressBar
