import { Menu } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { ListStart } from 'lucide-react'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'

import { usePlaylistContext } from '../../context'

const AddNext = () => {
  const { id, trackCount } = usePlaylistContext()
  const addNext = usePlayerStore((state) => state.addNext)
  const queue = usePlayerStore((state) => state.queue)
  const queryClient = useQueryClient()

  const handleClick = async () => {
    const pl = await queryClient.fetchQuery(getPlaylistQueryOptions(id))
    const ids = pl.tracks.map(({ id }) => id)
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
