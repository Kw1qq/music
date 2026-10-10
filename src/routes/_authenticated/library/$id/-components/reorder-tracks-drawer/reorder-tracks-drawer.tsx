import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import { Drawer, ScrollArea } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { putReorderTracksInPlaylistMutationOption } from '@/api/playlists/put-reorder-tracks-in-playlist/put-reorder-tracks-in-playlist-mutation-options'
import { useDragStore } from '@/stores/use-drag-store'

import Item from './components/item'
import Track from './components/track'

import styles from './reorder-tracks-drawer.module.css'

interface ReorderTracksDrawerProps {
  opened: boolean
  playlistId: string
  tracks: PlaylistDetail['tracks']
  close: () => void
}

const ReorderTracksDrawer = (props: ReorderTracksDrawerProps) => {
  const { tracks, opened, close, playlistId } = props

  const rootRef = useRef<HTMLUListElement>(null)
  const setDragging = useDragStore((state) => state.setDragging)
  const putReorderTracksInPlaylistMutation = useMutation(putReorderTracksInPlaylistMutationOption())

  return (
    <Drawer.Root opened={opened} position='bottom' size='xl' onClose={close}>
      <Drawer.Overlay />
      <Drawer.Content classNames={{ content: styles.content }}>
        <Drawer.Header className={styles.header}>
          <Drawer.Title>Изменить порядок</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <ScrollArea className={styles.scrollArea}>
          <Drawer.Body>
            <DragDropProvider
              onDragEnd={(event) => {
                setDragging(false)
                if (event.canceled) {
                  return
                }

                const newTracks = move(tracks ?? [], event)

                putReorderTracksInPlaylistMutation.mutate({
                  tracks: newTracks,
                  playlistId
                })
              }}
              onDragStart={() => setDragging(true)}
            >
              <ul ref={rootRef} className={styles.list}>
                {tracks.map((track, index) => (
                  <Item key={track.id} id={track.id} index={index} rootRef={rootRef}>
                    {() => <Track trackId={track.id} />}
                  </Item>
                ))}
              </ul>
            </DragDropProvider>
          </Drawer.Body>
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default ReorderTracksDrawer
