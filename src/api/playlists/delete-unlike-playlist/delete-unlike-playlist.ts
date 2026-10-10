import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export const deleteUnlikePlaylist = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.delete<PlaylistDetail>(`/playlists/${id}/like`, config)
  return data
}
