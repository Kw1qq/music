import type { AxiosRequestConfig } from 'axios'

import type { Artist } from '@/api/types/artist'

import { api } from '@/api/instance'

export const getArtist = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<Artist>(`/artists/${id}`, config)
  return data
}
