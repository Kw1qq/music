import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { deleteUnlikePlaylist } from './delete-unlike-playlist'

export const deleteUnlikePlaylistMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => deleteUnlikePlaylist(id, config),
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
