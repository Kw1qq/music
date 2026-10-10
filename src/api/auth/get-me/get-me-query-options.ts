import type { AxiosRequestConfig } from 'axios'

import { queryOptions } from '@tanstack/react-query'

import { getMe } from './get-me'

export const getMeQueryOptions = (config?: AxiosRequestConfig) =>
  queryOptions({
    queryKey: ['me'],
    queryFn: () => getMe(config)
  })
