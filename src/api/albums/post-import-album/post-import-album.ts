import type { AxiosRequestConfig } from 'axios'

import type { Album } from '@/api/types/album'

import { api } from '@/api/instance'

export const postImportAlbum = async (albumId: string, config?: AxiosRequestConfig) => {
  const { data } = await api.post<Album>(`/albums/${albumId}/import`, {}, config)
  return data
}
