import { Menu } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { ListStart } from 'lucide-react'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'

import { useAlbumContext } from '../../context'

const AddNext = () => {
  const { albumId, trackCount } = useAlbumContext()
  const addNext = usePlayerStore((state) => state.addNext)
  const queue = usePlayerStore((state) => state.queue)
  const queryClient = useQueryClient()

  const handleClick = async () => {
    const pl = await queryClient.query(getAlbumQueryOptions(albumId))
    const ids = pl.tracks
      .map(({ existingTrack }) => existingTrack?.id)
      .filter((id) => id !== undefined)
    addNext(ids)
  }

  return (
    <Menu.Item
      disabled={queue.length === 0 || trackCount === 0}
      leftSection={<ListStart size={24} />}
      onClick={handleClick}
    >
      Играть следующим
    </Menu.Item>
  )
}

export default AddNext
