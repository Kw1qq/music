import type { AxiosRequestConfig } from 'axios'

import type { Album } from '@/api/types/album'

import { api } from '@/api/instance'

export const getAlbum = async (albumId: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<Album>(`/albums/${albumId}`, config)
  return data
}
