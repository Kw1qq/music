import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import type { Track } from '@/api/types/track'

import { getLikedTracks } from './get-liked-tracks'

export const getLikedTracksQueryOptions = (config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['tracks', 'liked'],
    queryFn: async ({ signal, client }) => {
      const tracks = await getLikedTracks({ ...config, signal })

      tracks.forEach((track: Track) => {
        client.setQueryData(['tracks', track.id], track)
      })

      return tracks
    }
  })
