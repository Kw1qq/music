import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export const getPlaylist = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<PlaylistDetail>(`/playlists/${id}`, config)
  data.cover = `${data.cover}?t=${Date.now()}`
  return data
}
