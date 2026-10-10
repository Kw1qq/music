import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export const postLikePlaylist = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.post<PlaylistDetail>(`/playlists/${id}/like`, {}, config)
  return data
}
