import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getHistoryFromSearch } from './get-history-from-search'

export const getHistoryFromSearchQueryOptions = (config?: AxiosRequestConfig) =>
  queryOptions({
    queryFn: ({ signal }) => getHistoryFromSearch({ ...config, signal }),
    queryKey: ['history']
  })
