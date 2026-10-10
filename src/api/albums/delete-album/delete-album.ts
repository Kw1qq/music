import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export const deleteAlbum = async (albumId: string, config?: AxiosRequestConfig) => {
  const { data } = await api.delete(`/albums/${albumId}`, config)
  return data
}
