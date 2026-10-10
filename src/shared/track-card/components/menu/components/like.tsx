import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Heart, HeartOff } from 'lucide-react'

import { postUnlikeTrackMutationOption } from '@/api/tracks/delete-unlike-track/delete-unlike-track-mutation-options'
import { postLikeTrackMutationOption } from '@/api/tracks/post-like-track/post-like-track-mutation-option'

import { useTrackContext } from '../../context'

const Like = () => {
  const { likedAt, id } = useTrackContext()
  const postLikeTrackMutation = useMutation(postLikeTrackMutationOption())
  const postUnlikeTrackMutation = useMutation(postUnlikeTrackMutationOption())

  const handleClick = () => {
    if (likedAt) {
      postUnlikeTrackMutation.mutate(id)
    } else {
      postLikeTrackMutation.mutate(id)
    }
  }

  const action = likedAt ? <HeartOff size={24} /> : <Heart size={24} />

  return (
    <Menu.Item leftSection={action} onClick={handleClick}>
      {likedAt ? 'Не нравится' : 'Нравится'}
    </Menu.Item>
  )
}

export default Like
