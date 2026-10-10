import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Heart, HeartOff } from 'lucide-react'

import { deleteUnlikePlaylistMutationOption } from '@/api/playlists/delete-unlike-playlist/delete-unlike-playlist-mutation-option'
import { postLikePlaylistMutationOption } from '@/api/playlists/post-like-playlist/post-like-playlist-mutation-option'

import { usePlaylistContext } from '../../context'

const Like = () => {
  const { isLiked, id } = usePlaylistContext()

  const postLikePlaylistMutation = useMutation(postLikePlaylistMutationOption())
  const deleteUnlikePlaylistMutation = useMutation(deleteUnlikePlaylistMutationOption())

  const onLikeHandler = () => {
    if (!isLiked) {
      postLikePlaylistMutation.mutate(id)
    } else {
      deleteUnlikePlaylistMutation.mutate(id)
    }
  }

  return (
    <Menu.Item
      leftSection={isLiked ? <HeartOff size={24} /> : <Heart size={24} />}
      onClick={onLikeHandler}
    >
      {isLiked ? 'Не нравится' : 'Нравится'}
    </Menu.Item>
  )
}

export default Like
