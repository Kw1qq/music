import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { getTrack } from './get-track'

export const getTrackQueryOptions = (id: string | null) =>
  queryOptions({
    queryKey: ['tracks', id],
    queryFn: () => getTrack(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
    staleTime: Infinity
  })
