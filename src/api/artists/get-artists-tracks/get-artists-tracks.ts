import type { AxiosRequestConfig } from 'axios'

import type { ArtistTopSong } from '@/api/types/ArtistTopSong'

import { api } from '@/api/instance'

interface ArtistTracksResponse {
  artistId: string
  tracks: ArtistTopSong[]
}

export const getArtistsTracks = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.get<ArtistTracksResponse>(`/artists/${id}/tracks`, config)
  return data
}
