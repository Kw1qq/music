import type { AxiosRequestConfig } from 'axios'

import type { PlaylistSummary } from '@/api/types/playlist-summary'

import { api } from '@/api/instance'

export const getMinePlaylists = async (trackId?: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<PlaylistSummary[]>(
    `/playlists/mine${trackId ? `?trackId=${trackId}` : ''}`,
    config
  )

  data.forEach((playlist) => {
    playlist.cover = `${playlist.cover}?t=${Date.now()}`
  })

  return data
}
