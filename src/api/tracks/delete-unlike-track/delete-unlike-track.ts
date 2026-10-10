import type { AxiosRequestConfig } from 'axios'

import type { Track } from '@/api/types/track'

import { api } from '@/api/instance'

export const postUnlikeTrack = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.delete<Track>(`/tracks/${id}/like`, config)
  return data
}
