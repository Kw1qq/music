import type { AxiosRequestConfig } from 'axios'

import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query'

import type { getTracksFromSearchArg } from './get-youtube-search'

import { getYoutubeSearch } from './get-youtube-search'

export const getYoutubeSearchInfinityQueryOptions = (
  arg: Pick<getTracksFromSearchArg, 'search' | 'type'>,
  config?: AxiosRequestConfig
) => {
  const LIMIT = 10

  return infiniteQueryOptions({
    queryKey: ['search', arg],
    queryFn: ({ signal, pageParam }) =>
      getYoutubeSearch(
        { search: arg.search, limit: LIMIT, offset: pageParam, type: arg.type },
        { ...config, signal }
      ),
    staleTime: Infinity,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        const nextOffset = (lastPage.offset ?? 0) + LIMIT
        return nextOffset
      }
      return undefined
    }
  })
}
