import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getArtistsTracks } from './get-artists-tracks'

export const getArtistsTracksQueryOptions = (id: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['artists', id, 'tracks'],
    queryFn: async ({ signal }) => getArtistsTracks(id, { ...config, signal })
  })
