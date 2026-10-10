import { Drawer, ScrollArea } from '@mantine/core'

import type { Artists } from '@/api/types/artists'

import ArtistCard from '@/shared/artist-card'

import styles from './artists-drawer.module.css'

interface ArtistsDrawerProps {
  artists: Artists
  opened: boolean
  close: () => void
  onNavigate?: () => void
}

const ArtistsDrawer = (props: ArtistsDrawerProps) => {
  const { artists, onNavigate, opened, close } = props

  return (
    <Drawer.Root opened={opened} position='bottom' onClose={close}>
      <Drawer.Overlay />
      <Drawer.Content classNames={{ content: styles.content }}>
        <Drawer.Header className={styles.header}>
          <Drawer.Title>Исполнители</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <ScrollArea className={styles.scrollArea}>
          <Drawer.Body className={styles.body}>
            {artists?.map((artist) => (
              <ArtistCard
                key={artist.artistId}
                artist={{ ...artist, thumbnail: artist.avatar }}
                classname={styles.card}
                onClick={() => {
                  onNavigate?.()
                  close()
                }}
              >
                <ArtistCard.Wrapper>
                  <ArtistCard.Avatar />
                  <ArtistCard.Name />
                </ArtistCard.Wrapper>
              </ArtistCard>
            ))}
          </Drawer.Body>
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default ArtistsDrawer
