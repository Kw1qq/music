import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { deleteAlbumMutationOption } from '@/api/albums/delete-album/delete-album-mutation-options'

import { useAlbumContext } from '../../context'

const Delete = () => {
  const { albumId } = useAlbumContext()

  const deleteAlbumMutation = useMutation(deleteAlbumMutationOption())

  const deleteAlbum = () => {
    deleteAlbumMutation.mutate(albumId)
  }

  return (
    <Menu.Item leftSection={<Trash size={24} />} onClick={deleteAlbum}>
      Удалить
    </Menu.Item>
  )
}

export default Delete
