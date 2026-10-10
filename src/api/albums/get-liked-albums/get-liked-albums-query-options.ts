import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getLikedAlbums } from './get-liked-albums'

export const getLikedAlbumsQueryOptions = (config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['albums', 'liked'],
    queryFn: ({ signal }) => getLikedAlbums({ ...config, signal })
  })
