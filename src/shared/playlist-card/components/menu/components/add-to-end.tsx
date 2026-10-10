import { Menu } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { ListEnd } from 'lucide-react'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'

import { usePlaylistContext } from '../../context'

const AddToEnd = () => {
  const { id, trackCount } = usePlaylistContext()
  const addToEnd = usePlayerStore((state) => state.addToEnd)
  const queue = usePlayerStore((state) => state.queue)
  const queryClient = useQueryClient()

  const handleClick = async () => {
    const pl = await queryClient.fetchQuery(getPlaylistQueryOptions(id))
    const ids = pl.tracks.map(({ id }) => id)
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
