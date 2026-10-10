import type { AxiosRequestConfig } from 'axios'

import type { Album } from '@/api/types/album'

import { api } from '@/api/instance'

export const getLikedAlbums = async (config?: AxiosRequestConfig) => {
  const { data } = await api.get<Album[]>('/albums/liked', config)
  return data
}
