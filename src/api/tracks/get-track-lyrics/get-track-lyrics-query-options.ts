import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { parseSyncedLyrics } from '@/utils/parse-lyrics'

import { getTrackLyrics } from './get-track-lyrics'

export const getTrackLyricsQueryOptions = (id: string, config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['tracks', id, 'lyrics'],
    queryFn: async ({ signal }) =>
      getTrackLyrics(id, { ...config, signal }).then(({ synced, plain }) => ({
        synced: synced ? parseSyncedLyrics(synced) : null,
        plain
      }))
  })
