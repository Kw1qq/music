import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import type { putReorderTracksInPlaylistArg } from './put-reorder-tracks-in-playlist'

import { putReorderTracksInPlaylist } from './put-reorder-tracks-in-playlist'

export const putReorderTracksInPlaylistMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (arg: putReorderTracksInPlaylistArg) => putReorderTracksInPlaylist(arg, config),
    onMutate: async ({ playlistId, tracks }, { client }) => {
      await client.cancelQueries({ queryKey: ['playlists', playlistId] })

      const prev = client.getQueryData<PlaylistDetail>(['playlists', playlistId])

      client.setQueryData(['playlists', playlistId], (prev: PlaylistDetail) => ({
        ...prev,
        tracks
      }))

      return { prev }
    },
    onError: (_, { playlistId }, variables, { client }) => {
      if (variables) {
        client.setQueryData(['playlists', playlistId], variables.prev)
      }
    },
    onSuccess: (_, { playlistId }, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists', playlistId] })
    }
  })
