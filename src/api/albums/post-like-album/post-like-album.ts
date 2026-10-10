import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export const postLikeAlbum = async (albumId: string, config?: AxiosRequestConfig) => {
  const { data } = await api.post<PlaylistDetail>(`/albums/${albumId}/like`, {}, config)
  return data
}
