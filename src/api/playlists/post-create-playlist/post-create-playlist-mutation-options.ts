import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { postCreatePlaylistArg } from './post-create-playlist'

import { postCreatePlaylist } from './post-create-playlist'

export const postCreatePlaylistMutationOptions = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (playlist: postCreatePlaylistArg) => postCreatePlaylist(playlist, config),
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
