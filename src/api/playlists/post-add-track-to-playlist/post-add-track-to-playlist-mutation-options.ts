import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { postAddTrackToPlaylistArg } from './post-add-track-to-playlist'

import { postAddTrackToPlaylist } from './post-add-track-to-playlist'

export const postAddTrackToPlaylistMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (arg: postAddTrackToPlaylistArg) => postAddTrackToPlaylist(arg, config),
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
