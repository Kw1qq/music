import { Button, Drawer, Loader, ScrollArea } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getMinePlaylistsQueryOptions } from '@/api/playlists/get-mine-playlists/get-mine-playlists-query-options'
import { postAddTrackToPlaylistMutationOption } from '@/api/playlists/post-add-track-to-playlist/post-add-track-to-playlist-mutation-options'
import Grid from '@/shared/ui/grid'

import { useAddToPalylistDrawerContext, useTrackContext } from '../context'
import Playlist from './components/playlist'

import styles from './add-to-playlist-drawer.module.css'

const AddToPlaylistDrawer = () => {
  const { isExpanded, close } = useAddToPalylistDrawerContext()

  const { id } = useTrackContext()
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null)

  const getMinePlaylistQuery = useQuery({
    ...getMinePlaylistsQueryOptions(id),
    enabled: isExpanded
  })
  const postAddTrackToPlaylistMutation = useMutation(postAddTrackToPlaylistMutationOption())

  if (getMinePlaylistQuery.isError) {
    return null
  }

  const playlists = getMinePlaylistQuery.data?.filter(({ containsTrack }) => !containsTrack) ?? []

  const addTrack = () => {
    close()
    if (selectedPlaylist) {
      postAddTrackToPlaylistMutation.mutate({
        id: selectedPlaylist,
        trackId: id
      })
    }
  }

  const clear = () => {
    setSelectedPlaylist(null)
  }

  return (
    <Drawer.Root
      opened={isExpanded}
      position='bottom'
      size='xl'
      onClose={close}
      onExitTransitionEnd={clear}
    >
      <Drawer.Overlay />
      <Drawer.Content classNames={{ content: styles.content }}>
        <Drawer.Header className={styles.header}>
          <Drawer.Title>Выбрать плейлист</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <ScrollArea className={styles.scrollArea}>
          <Drawer.Body className={styles.body}>
            <div className={styles.actions}>
              <Button disabled={!selectedPlaylist} onClick={addTrack}>
                Добавить трек
              </Button>
            </div>
            {getMinePlaylistQuery.isPending ? (
              <div className={styles.loader}>
                <Loader />
              </div>
            ) : (
              <Grid
                render={(playlist) => (
                  <Playlist
                    isSelect={playlist.id === selectedPlaylist}
                    playlist={playlist}
                    onSelect={() => setSelectedPlaylist(playlist.id)}
                  />
                )}
                data={playlists}
                getKey={(playlist) => playlist.id}
              />
            )}
          </Drawer.Body>
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default AddToPlaylistDrawer
