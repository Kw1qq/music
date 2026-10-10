import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import type { deleteTrackFromPlaylistArg } from './delete-track-from-playlist'

import { deleteTrackFromPlaylist } from './delete-track-from-playlist'

export const deleteTrackFromPlaylistMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (arg: deleteTrackFromPlaylistArg) => deleteTrackFromPlaylist(arg, config),
    onMutate: async ({ playlistId, trackId }, { client }) => {
      await client.cancelQueries({ queryKey: ['playlists', playlistId] })

      const prev = client.getQueryData<PlaylistDetail>(['playlists', playlistId])

      client.setQueryData(['playlists', playlistId], (prev: PlaylistDetail) => ({
        ...prev,
        tracks: prev.tracks.filter((t) => t.id !== trackId)
      }))

      return { prev }
    },
    onError: (_, { playlistId }, variables, { client }) => {
      if (variables) {
        client.setQueryData(['playlists', playlistId], variables.prev)
      }
    },
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
