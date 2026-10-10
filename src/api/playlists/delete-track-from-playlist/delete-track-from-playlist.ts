import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export interface deleteTrackFromPlaylistArg {
  playlistId: string
  trackId: string
}

export const deleteTrackFromPlaylist = async (
  { trackId, playlistId }: deleteTrackFromPlaylistArg,
  config?: AxiosRequestConfig
) => {
  const { data } = await api.delete(`/playlists/${playlistId}/tracks/${trackId}`, config)
  return data
}
