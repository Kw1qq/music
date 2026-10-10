import type { AxiosRequestConfig } from 'axios'

import type { Track } from '@/api/types/track'

import { api } from '@/api/instance'

export const getLikedTracks = async (config?: AxiosRequestConfig) => {
  const { data } = await api.get<Track[]>('/tracks/liked', config)
  return data
}
