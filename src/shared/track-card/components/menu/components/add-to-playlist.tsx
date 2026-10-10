import { Menu } from '@mantine/core'
import { ListPlus } from 'lucide-react'

import { useAddToPalylistDrawerContext } from '../../context'

const AddToPlaylist = () => {
  const { open } = useAddToPalylistDrawerContext()

  return (
    <Menu.Item leftSection={<ListPlus size={24} />} onClick={open}>
      Добавить в плейлист
    </Menu.Item>
  )
}

export default AddToPlaylist
