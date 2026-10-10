import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { deletePlaylistMutationOptions } from '@/api/playlists/delete-playlist/delete-playlist-mutation-options'

import { usePlaylistContext } from '../../context'

interface DeleteProps {
  onDelete?: () => void
}

const Delete = (props: DeleteProps) => {
  const { onDelete } = props

  const { id } = usePlaylistContext()
  const deletePlaylistMutation = useMutation(deletePlaylistMutationOptions())

  const deletePlaylist = async () => {
    await deletePlaylistMutation.mutateAsync(id)
    onDelete?.()
  }

  return (
    <Menu.Item leftSection={<Trash size={24} />} onClick={deletePlaylist}>
      Удалить
    </Menu.Item>
  )
}

export default Delete
