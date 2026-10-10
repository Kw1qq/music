import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { postLikePlaylist } from './post-like-playlist'

export const postLikePlaylistMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => postLikePlaylist(id, config),
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
