import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { patchPlaylistArg } from './patch-playlist'

import { patchPlaylist } from './patch-playlist'

export const patchPlaylistMutationOptions = (id: string, config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (playlist: patchPlaylistArg) => patchPlaylist(id, playlist, config),
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
