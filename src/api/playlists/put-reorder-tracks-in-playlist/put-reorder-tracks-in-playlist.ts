import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export interface putReorderTracksInPlaylistArg {
  playlistId: string
  tracks: PlaylistDetail['tracks']
}

export const putReorderTracksInPlaylist = async (
  { playlistId, tracks }: putReorderTracksInPlaylistArg,
  config?: AxiosRequestConfig
) => {
  const trackIds = tracks.map(({ id }) => id)

  const { data } = await api.put<PlaylistDetail>(
    `/playlists/${playlistId}/reorder`,
    { trackIds },
    config
  )

  return data
}
