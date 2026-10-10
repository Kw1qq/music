import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getMinePlaylists } from './get-mine-playlists'

export const getMinePlaylistsQueryOptions = (trackId?: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['playlists', 'mine', trackId],
    queryFn: ({ signal }) => getMinePlaylists(trackId, { ...config, signal })
  })
