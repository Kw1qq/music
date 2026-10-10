import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import type { Track } from '@/api/types/track'

import { getPlaylist } from './get-playlist'

export const getPlaylistQueryOptions = (id: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['playlists', id],
    queryFn: async ({ signal, client }) => {
      const playlist = await getPlaylist(id, { ...config, signal })

      playlist.tracks.forEach((track: Track) => {
        client.setQueryData(['tracks', track.id], track)
      })

      return playlist
    },
    throwOnError: true
  })
