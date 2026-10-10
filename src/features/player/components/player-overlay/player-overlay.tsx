import type { RefObject } from 'react'

import { ActionIcon, FocusTrap, Portal, SegmentedControl } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

import type { Track } from '@/api/types/track'

import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

import { transition } from '../../constants/motion-transition'
import Actions from '../ui/actions'
import Animate from '../ui/animate'
import Artist from '../ui/artist'
import Image from '../ui/image'
import Lyrics from '../ui/lyrics'
import Menu from '../ui/menu'
import PlayButton from '../ui/play-button'
import PlayNext from '../ui/play-next'
import PlayPrev from '../ui/play-prev'
import ProgressBar from '../ui/progress-bar'
import QueueButton from '../ui/queue-button'
import RepeatButton from '../ui/repeat-button'
import ShuffleButton from '../ui/shuffle-button'
import Title from '../ui/title'
import Video from '../ui/video'
import Volume from '../ui/volume'
import { usePointerInteraction } from './hooks/use-pointer-interaction'

import styles from './player-overlay.module.css'

interface OverlayProps {
  color?: string
  currentTrack: Track
  imageRef: RefObject<HTMLImageElement | null>
  close: () => void
  drawerOpen: () => void
}

const CLOSE_DRAG_DISTANCE = 200
const CLOSE_THRESHOLD = 0.3
const CLOSE_VELOCITY_THRESHOLD = 500

const PlayerOverlay = (props: OverlayProps) => {
  const { close, imageRef, color, drawerOpen, currentTrack } = props
  const [displayMode, setDisplayMode] = useState<'cover' | 'lyrics' | 'video'>('cover')
  const isTouch = useIsTouch()
  const isTablet = useMediaQuery('(width < 1200px)')
  const { isInteractingWithControl, handlerPointerDownCapture } = usePointerInteraction()

  const isDrag = isTouch && !isInteractingWithControl
  const dragProgress = useMotionValue(0)
  const overlayY = useTransform(dragProgress, [0, 1], [0, CLOSE_DRAG_DISTANCE])

  const isCoverVisible = displayMode === 'cover' || (displayMode === 'lyrics' && !isTablet)

  useEffect(() => {
    if (
      (currentTrack.lyricsStatus === 'none' || currentTrack.lyricsStatus === 'not_found') &&
      displayMode === 'lyrics'
    ) {
      setDisplayMode('cover')
    }
  }, [currentTrack.lyricsStatus])

  return (
    <Portal>
      <FocusTrap>
        <motion.div
          style={{
            y: overlayY,
            touchAction: isDrag ? 'none' : undefined
          }}
          className={styles.overlay}
          onPan={(_, info) => {
            if (!isDrag) {
              return
            }

            const delta = Math.max(0, info.offset.y)
            dragProgress.set(Math.min(1, delta / CLOSE_DRAG_DISTANCE))
          }}
          onPanEnd={(_, info) => {
            if (!isDrag) {
              return
            }

            const shouldClose =
              dragProgress.get() > CLOSE_THRESHOLD || info.velocity.y > CLOSE_VELOCITY_THRESHOLD

            if (shouldClose) {
              close()
            } else {
              animate(dragProgress, 0, { type: 'spring', bounce: 0.2 })
            }
          }}
          onPointerDownCapture={handlerPointerDownCapture}
        >
          <motion.div
            animate={{ backgroundColor: color }}
            className={styles.inner}
            layoutId='player'
            transition={transition}
          >
            <TrackCard.Provider track={currentTrack}>
              {isTouch ? (
                <div className={styles.line} />
              ) : (
                <ActionIcon classNames={{ root: styles.closeButton }} onClick={close}>
                  <ChevronDown size={32} />
                </ActionIcon>
              )}

              <div
                className={clsx(
                  styles.wrapper,
                  displayMode === 'lyrics' && !isTablet && styles.lyricsGrid
                )}
              >
                <motion.div className={styles.column} layout='position'>
                  <Animate>
                    <SegmentedControl
                      classNames={{
                        root: styles.segmentedControl,
                        input: styles.segmentedControlInput,
                        label: styles.segmentedControlLabel
                      }}
                      data={[
                        { label: 'Обложка', value: 'cover' },
                        {
                          label: 'Клип',
                          value: 'video',
                          disabled: currentTrack.videoStatus !== 'ready'
                        },
                        {
                          label: 'Текст',
                          value: 'lyrics',
                          disabled: currentTrack.lyricsStatus !== 'found'
                        }
                      ]}
                      className={styles.segmentedControl}
                      value={displayMode}
                      withItemsBorders={false}
                      onChange={setDisplayMode}
                    />
                  </Animate>

                  <div className={clsx(styles.container, displayMode === 'cover' && styles.cover)}>
                    {displayMode === 'video' && <Video />}

                    {displayMode === 'lyrics' && isTablet && (
                      <div className={styles.lyricsWrapper}>
                        <Lyrics
                          className={styles.lyrics}
                          currentTrack={currentTrack}
                          overlayClose={close}
                        />
                      </div>
                    )}

                    <Image
                      className={styles.image}
                      imageRef={imageRef}
                      wrapperClassName={clsx(styles.imageWrapper, !isCoverVisible && styles.hidden)}
                    />

                    <Animate className={styles.data}>
                      <Title key={currentTrack.id} className={styles.title}>
                        {!isTouch && <Menu />}
                      </Title>
                      <Artist className={styles.artist} onNavigate={close} />
                    </Animate>
                  </div>

                  <div className={styles.bottom}>
                    <ProgressBar className={styles.progressBar} />

                    <div className={styles.actionWrapper}>
                      <Animate className={styles.actionsLeft}>
                        <RepeatButton />
                        <ShuffleButton />
                      </Animate>
                      <Actions className={styles.actionsCenter}>
                        <PlayPrev />
                        <PlayButton className={styles.playButton} />
                        <PlayNext />
                      </Actions>
                      <Animate className={styles.actionsRight}>
                        {!isTouch && (
                          <Volume
                            dropDownClassNames={{
                              dropdown: styles.dropdown
                            }}
                            sliderClassNames={{
                              thumb: styles.thumb,
                              bar: styles.bar,
                              track: styles.track
                            }}
                          />
                        )}
                        <QueueButton onClick={drawerOpen} />
                        {isTouch && <Menu classNames={{ root: styles.menuButton }} />}
                      </Animate>
                    </div>
                  </div>
                </motion.div>

                {displayMode === 'lyrics' && !isTablet && (
                  <Lyrics currentTrack={currentTrack} overlayClose={close} />
                )}
              </div>

              <TrackCard.AddToPlaylistDrawer />
            </TrackCard.Provider>
          </motion.div>
        </motion.div>
      </FocusTrap>
    </Portal>
  )
}

export default PlayerOverlay
