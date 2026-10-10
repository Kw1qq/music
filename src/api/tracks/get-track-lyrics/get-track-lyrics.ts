import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

interface LyricsResponse {
  found: boolean
  pending: boolean
  plain: string | null
  synced: string | null
}

export const getTrackLyrics = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<LyricsResponse>(`/tracks/${id}/lyrics`, config)
  return data
}
