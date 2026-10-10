import { useRef } from 'react'

import { formatSeconds } from '@/utils/format-seconds'

import { useDragProgress } from './hooks/use-drag-progress'
import { useTooltip } from './hooks/use-tootip'

import styles from './bar.module.css'

const Bar = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const { isTooltipVisible, moveProgressPercent, moveProgress } = useTooltip({
    trackRef,
    tooltipRef
  })
  const { displayProgressPercent } = useDragProgress({ trackRef })

  const tooltipRangeStops = `
    var(--player-background-progress-bar-range-color) ${displayProgressPercent}%,
    var(--player-background-progress-bar-range-color) ${moveProgressPercent}%,
   `

  const background = `linear-gradient(90deg,
              var(--player-text-color) ${displayProgressPercent}%,
              ${isTooltipVisible ? tooltipRangeStops : ''}
              var(--player-background-progress-bar-color) ${displayProgressPercent}%)`

  return (
    <div data-no-drag ref={trackRef} className={styles.track}>
      {isTooltipVisible && (
        <div ref={tooltipRef} className={styles.tooltip}>
          {formatSeconds(moveProgress)}
        </div>
      )}
      <div
        style={{
          background
        }}
        className={styles.progress}
      />
      <div className={styles.handle} style={{ left: `${displayProgressPercent}%` }} />
    </div>
  )
}

export default Bar
