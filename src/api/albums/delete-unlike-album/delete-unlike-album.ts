import type { AxiosRequestConfig } from 'axios'

import type { Album } from '@/api/types/album'

import { api } from '@/api/instance'

export const deleteUnlikeAlbum = async (albumId: string, config?: AxiosRequestConfig) => {
  const { data } = await api.delete<Album>(`/albums/${albumId}/like`, config)
  return data
}
