import type { AxiosRequestConfig } from 'axios'

import type { Album } from '@/api/types/album'
import type { ArtistSummary } from '@/api/types/artist-summary'
import type { YoutubeSearchResult } from '@/api/types/youtube-search-result'

import { api } from '@/api/instance'

export interface getTracksFromSearchArg {
  limit: number
  offset: number
  search: string
  type?: 'album' | 'artist' | 'track'
}

export interface BaseYoutubeResponse {
  hasMore: boolean
  limit: number
  offset: number
}

export type YoutubeSearchResponse =
  | (BaseYoutubeResponse & { type: 'album'; results: Album[] })
  | (BaseYoutubeResponse & { type: 'artist'; results: ArtistSummary[] })
  | (BaseYoutubeResponse & { type: 'track'; results: YoutubeSearchResult[] })

export const getYoutubeSearch = async (
  { search, limit, offset, type = 'track' }: getTracksFromSearchArg,
  config?: AxiosRequestConfig
) => {
  const { data } = await api.get<YoutubeSearchResponse>(
    `/youtube/search?q=${search}&type=${type}&limit=${limit}&offset=${offset}`,
    config
  )

  return data
}
