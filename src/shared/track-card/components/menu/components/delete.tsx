import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

import { deleteTrackMutationOption } from '@/api/tracks/delete-track/delete-track-mutation-options'

import { useTrackContext } from '../../context'

const Delete = () => {
  const { id } = useTrackContext()
  const deleteTrackMutation = useMutation(deleteTrackMutationOption())

  const handleClick = () => {
    deleteTrackMutation.mutate(id)
  }

  return (
    <Menu.Item leftSection={<Trash2 size={24} />} onClick={handleClick}>
      Удалить
    </Menu.Item>
  )
}

export default Delete
