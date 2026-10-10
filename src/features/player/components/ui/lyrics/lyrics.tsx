import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { motion } from 'motion/react'

import type { Track } from '@/api/types/track'

import { getTrackLyricsQueryOptions } from '@/api/tracks/get-track-lyrics/get-track-lyrics-query-options'
import { useExpanded } from '@/hooks/use-expanded'

import LyricsDrawer from './components/lurics-drawer'
import Plain from './components/plain'
import ScrollPlain from './components/scroll-plain'
import ScrollSynced from './components/scroll-synced'
import Synced from './components/synced'

import styles from './lyrics.module.css'

interface LyricsProps {
  className?: string
  currentTrack: Track
  overlayClose: () => void
}

const Lyrics = (props: LyricsProps) => {
  const { currentTrack, className, overlayClose } = props
  const getTrackLyricsQuery = useQuery(getTrackLyricsQueryOptions(currentTrack.id))

  const isSynced = !!getTrackLyricsQuery.data?.synced
  const isPlained = !!getTrackLyricsQuery.data?.plain && !isSynced

  const syncedLines = getTrackLyricsQuery.data?.synced ?? []
  const plain = getTrackLyricsQuery.data?.plain ?? ''

  const { isExpanded, open, close } = useExpanded()

  const handleClick = () => {
    open()
  }

  return (
    <>
      <motion.button
        layout
        animate={{ opacity: 1 }}
        className={clsx(styles.wrapper, className)}
        disabled={getTrackLyricsQuery.isPending}
        initial={{ opacity: 0 }}
        onClick={handleClick}
      >
        {getTrackLyricsQuery.isPending ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={clsx(styles.container, isSynced && styles.gradient)}>
            {isPlained && <Plain plain={plain} />}
            {isSynced && <Synced lines={syncedLines} />}
          </div>
        )}
      </motion.button>

      <LyricsDrawer
        currentTrack={currentTrack}
        opened={isExpanded}
        onClose={() => {
          close()
        }}
        onNavigate={() => {
          close()
          overlayClose()
        }}
      >
        {isPlained && <ScrollPlain plain={plain} />}
        {isSynced && <ScrollSynced lines={syncedLines} />}
      </LyricsDrawer>
    </>
  )
}

export default Lyrics
