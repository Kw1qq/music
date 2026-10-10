import type { RefObject } from 'react'

import { useMediaQuery } from '@mantine/hooks'
import { motion } from 'motion/react'

import type { Track } from '@/api/types/track'

import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

import { transition } from '../../constants/motion-transition'
import Actions from '../ui/actions'
import Animate from '../ui/animate'
import Artist from '../ui/artist'
import Image from '../ui/image'
import Menu from '../ui/menu'
import PlayButton from '../ui/play-button'
import PlayNext from '../ui/play-next'
import PlayPrev from '../ui/play-prev'
import ProgressBar from '../ui/progress-bar'
import QueueButton from '../ui/queue-button'
import RepeatButton from '../ui/repeat-button'
import ShuffleButton from '../ui/shuffle-button'
import SimpleProgressBar from '../ui/simple-progress-bar'
import Title from '../ui/title'
import Volume from '../ui/volume'

import styles from './player-bar.module.css'

interface PlayerBarProps {
  color?: string
  currentTrack: Track
  imageRef: RefObject<HTMLImageElement | null>
  drawerOpen: () => void
  open: () => void
}

const PlayerBar = (props: PlayerBarProps) => {
  const { open, imageRef, color, drawerOpen, currentTrack } = props

  const isDesktop = useMediaQuery('(width < 1350px)')
  const isTablet = useMediaQuery('(width < 950px)')
  const isTouch = useIsTouch()

  return (
    <>
      <motion.div
        animate={{ backgroundColor: color }}
        className={styles.player}
        layoutId='player'
        transition={transition}
        onClick={() => {
          if (isTouch) {
            open()
          }
        }}
      >
        <TrackCard.Provider track={currentTrack}>
          <TrackCard.AddToPlaylistDrawer />
          <TrackCard.Wrapper>
            <Image imageRef={imageRef} onClick={open} />
            <Animate className={styles.animateData}>
              <TrackCard.Data className={styles.data}>
                <Title key={currentTrack.id}>{!isTouch && <Menu />}</Title>
                <Artist isLink={!isTouch} />
              </TrackCard.Data>
            </Animate>
          </TrackCard.Wrapper>
        </TrackCard.Provider>

        <div className={styles.playerControls}>
          <Actions>
            {!isTablet && <PlayPrev />}
            <PlayButton className={styles.button} />
            {!isTablet && <PlayNext />}
          </Actions>

          {!isTablet && <ProgressBar className={styles.progressBar} />}
        </div>

        {!isDesktop && (
          <Animate className={styles.flex}>
            <RepeatButton />
            <ShuffleButton />
            <Volume />
            <QueueButton onClick={drawerOpen} />
          </Animate>
        )}

        {isTablet && <SimpleProgressBar />}
      </motion.div>
    </>
  )
}

export default PlayerBar
