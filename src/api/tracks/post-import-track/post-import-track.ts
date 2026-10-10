import type { AxiosRequestConfig } from 'axios'

import type { YoutubeSearchResult } from '@/api/types/youtube-search-result'

import { api } from '@/api/instance'

export const postImportTrack = async (url: string, config?: AxiosRequestConfig) => {
  const { data } = await api.post<NonNullable<YoutubeSearchResult['existingTrack']>>(
    '/tracks/import-youtube',
    { url },
    config
  )
  return data
}
