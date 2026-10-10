import { Menu } from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { memo } from 'react'

import { deleteTrackFromPlaylistMutationOption } from '@/api/playlists/delete-track-from-playlist/delete-track-from-playlist-mutation-options'
import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useIsTouch } from '@/hooks/use-is-touch'
import TrackCard from '@/shared/track-card'

interface TrackProps {
  index: number
  isOwner: boolean
  playlistId: string
  queue: string[]
  trackId: string
}

const Track = (props: TrackProps) => {
  const { trackId, queue, index, playlistId, isOwner } = props

  const getTrackQuery = useQuery(getTrackQueryOptions(trackId))
  const deleteTrackFromPlaylistMutation = useMutation(deleteTrackFromPlaylistMutationOption())

  const playQueue = usePlayerStore((state) => state.playQueue)

  const isTouch = useIsTouch()

  const track = getTrackQuery.data
  if (!track || getTrackQuery.isError) {
    return null
  }

  const onPlay = () => {
    playQueue(queue, index)
  }

  const onDelete = () => {
    deleteTrackFromPlaylistMutation.mutate({
      playlistId,
      trackId
    })
  }

  return (
    <TrackCard.Provider track={track}>
      <TrackCard onPlay={onPlay}>
        <TrackCard.Wrapper>
          <TrackCard.CoverPlayer cover={<TrackCard.Cover />} onPlay={onPlay} />
          <TrackCard.Data>
            <TrackCard.Title />
            <TrackCard.Artist isLink={!isTouch} />
          </TrackCard.Data>
        </TrackCard.Wrapper>
        <TrackCard.Wrapper>
          <TrackCard.Duration />
          <TrackCard.Menu>
            {isTouch && <TrackCard.Menu.GoToArtists />}
            <TrackCard.Menu.Like />
            <TrackCard.Menu.AddToPlaylist />
            {isOwner && (
              <Menu.Item leftSection={<Trash size={24} />} onClick={onDelete}>
                Удалить из плейлиста
              </Menu.Item>
            )}
            <TrackCard.Menu.AddNext />
            <TrackCard.Menu.AddToEnd />
            <TrackCard.Menu.Delete />
          </TrackCard.Menu>
        </TrackCard.Wrapper>
      </TrackCard>
      <TrackCard.AddToPlaylistDrawer />
    </TrackCard.Provider>
  )
}

export default memo(Track)
