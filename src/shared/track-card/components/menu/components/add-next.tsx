import { Menu } from '@mantine/core'
import { ListStart } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { useTrackContext } from '../../context'

const AddNext = () => {
  const { id } = useTrackContext()
  const addNext = usePlayerStore((state) => state.addNext)
  const queue = usePlayerStore((state) => state.queue)

  const handleClick = () => {
    addNext([id])
  }

  return (
    <Menu.Item
      disabled={queue.length === 0}
      leftSection={<ListStart size={24} />}
      onClick={handleClick}
    >
      Играть следующим
    </Menu.Item>
  )
}

export default AddNext
