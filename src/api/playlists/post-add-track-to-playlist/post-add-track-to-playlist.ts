import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export interface postAddTrackToPlaylistArg {
  id: string
  trackId: string
}

export const postAddTrackToPlaylist = async (
  { id, trackId }: postAddTrackToPlaylistArg,
  config?: AxiosRequestConfig
) => {
  const { data } = await api.post<PlaylistDetail>(`/playlists/${id}/tracks`, { trackId }, config)
  return data
}
