import type { ReactNode } from 'react'

import { Drawer, ScrollArea } from '@mantine/core'

import type { Track } from '@/api/types/track'

import TrackCard from '@/shared/track-card'

import Artist from '../../../artist'
import Title from '../../../title'

import styles from './lyrics-drawer.module.css'

interface LyricsProps {
  children: ReactNode
  currentTrack: Track
  opened: boolean
  onClose: () => void
  onNavigate: () => void
}

const LyricsDrawer = (props: LyricsProps) => {
  const { currentTrack, opened, onClose, onNavigate, children } = props

  return (
    <Drawer.Root opened={opened} position='bottom' onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Content classNames={{ content: styles.content }}>
        <Drawer.Header className={styles.header}>
          <Drawer.Title>
            <TrackCard.Provider track={currentTrack}>
              <TrackCard.AddToPlaylistDrawer />
              <TrackCard.Wrapper>
                <TrackCard.Cover />
                <TrackCard.Data>
                  <Title className={styles.title} />
                  <Artist onNavigate={onNavigate} />
                </TrackCard.Data>
              </TrackCard.Wrapper>
            </TrackCard.Provider>
          </Drawer.Title>
          <Drawer.CloseButton className={styles.close} />
        </Drawer.Header>
        <ScrollArea classNames={{ root: styles.scroll }}>
          <Drawer.Body className={styles.body}>{children}</Drawer.Body>
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default LyricsDrawer
