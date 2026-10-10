import { Menu } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { ListEnd } from 'lucide-react'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'

import { useAlbumContext } from '../../context'

const AddToEnd = () => {
  const { albumId, trackCount } = useAlbumContext()
  const addToEnd = usePlayerStore((state) => state.addToEnd)
  const queue = usePlayerStore((state) => state.queue)
  const queryClient = useQueryClient()

  const handleClick = async () => {
    const pl = await queryClient.query(getAlbumQueryOptions(albumId))
    const ids = pl.tracks
      .map(({ existingTrack }) => existingTrack?.id)
      .filter((id) => id !== undefined)
    addToEnd(ids)
  }

  return (
    <Menu.Item
      disabled={queue.length === 0 || trackCount === 0}
      leftSection={<ListEnd size={24} />}
      onClick={handleClick}
    >
      Добавить в конец
    </Menu.Item>
  )
}

export default AddToEnd
