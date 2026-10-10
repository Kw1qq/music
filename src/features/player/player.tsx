import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'

import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'

import { usePlayerStore } from './core/use-player-store'
import PlayerCore from './player-core'

import styles from './player.module.css'

const Player = () => {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const currentTrackQuery = useQuery(getTrackQueryOptions(currentTrackId))

  return (
    <motion.div
      animate={{ y: currentTrackId ? 0 : 40, opacity: currentTrackId ? 1 : 0 }}
      className={styles.wrapper}
      transition={{ duration: 0.2, ease: 'easeOut', delay: 0.4 }}
    >
      {!!currentTrackQuery.data && <PlayerCore currentTrack={currentTrackQuery.data} />}
    </motion.div>
  )
}

export default Player
