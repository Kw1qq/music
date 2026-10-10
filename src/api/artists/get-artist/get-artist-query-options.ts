import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getArtist } from './get-artist'

export const getArtistQueryOptions = (id: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['artists', id],
    queryFn: async ({ signal }) => getArtist(id, { ...config, signal }),
    throwOnError: true
  })
