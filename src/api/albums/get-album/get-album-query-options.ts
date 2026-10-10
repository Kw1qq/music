import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getAlbum } from './get-album'

export const getAlbumQueryOptions = (albumId: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['albums', albumId],
    queryFn: ({ signal }) => getAlbum(albumId, { ...config, signal })
  })
