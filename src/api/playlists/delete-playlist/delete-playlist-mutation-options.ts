import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { deletePlaylist } from './delete-playlist'

export const deletePlaylistMutationOptions = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => deletePlaylist(id, config),
    onSuccess: (_, id, ___, { client }) => {
      client.removeQueries({ queryKey: ['playlists', id] })
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
