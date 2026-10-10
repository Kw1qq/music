import { Menu } from '@mantine/core'
import { ListEnd } from 'lucide-react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { useTrackContext } from '../../context'

const AddToEnd = () => {
  const { id } = useTrackContext()
  const addToEnd = usePlayerStore((state) => state.addToEnd)
  const queue = usePlayerStore((state) => state.queue)

  const handleClick = () => {
    addToEnd([id])
  }

  return (
    <Menu.Item
      disabled={queue.length === 0}
      leftSection={<ListEnd size={24} />}
      onClick={handleClick}
    >
      Добавить в конец
    </Menu.Item>
  )
}

export default AddToEnd
