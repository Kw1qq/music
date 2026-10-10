import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Heart, HeartOff } from 'lucide-react'

import { deleteUnlikeAlbumMutationOption } from '@/api/albums/delete-unlike-album/delete-unlike-album-mutation-option'
import { postLikeAlbumMutationOption } from '@/api/albums/post-like-album/post-like-album-mutation-option'

import { useAlbumContext } from '../../context'

const Like = () => {
  const { existingAlbum, albumId } = useAlbumContext()

  const postLikePlaylistMutation = useMutation(postLikeAlbumMutationOption())
  const deleteUnlikePlaylistMutation = useMutation(deleteUnlikeAlbumMutationOption())

  const onLikeHandler = () => {
    if (!existingAlbum?.isLiked) {
      postLikePlaylistMutation.mutate(albumId)
    } else {
      deleteUnlikePlaylistMutation.mutate(albumId)
    }
  }

  return (
    <Menu.Item
      leftSection={existingAlbum?.isLiked ? <HeartOff size={24} /> : <Heart size={24} />}
      onClick={onLikeHandler}
    >
      {existingAlbum?.isLiked ? 'Не нравится' : 'Нравится'}
    </Menu.Item>
  )
}

export default Like
