import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import type { Track } from '@/api/types/track'

import { getTracks } from './get-tracks'

export const getTracksQueryOptions = (config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['tracks'],
    queryFn: async ({ signal, client }) => {
      const tracks = await getTracks({ ...config, signal })

      tracks.forEach((track: Track) => {
        client.setQueryData(['tracks', track.id], track)
      })

      return tracks
    }
  })
