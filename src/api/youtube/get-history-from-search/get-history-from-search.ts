import type { AxiosRequestConfig } from 'axios'

import type { SearchHistoryItem } from '@/api/types/search-history-item'

import { api } from '@/api/instance'

export const getHistoryFromSearch = async (config?: AxiosRequestConfig) => {
  const { data } = await api.get<SearchHistoryItem[]>(`/youtube/search/history?limit=${10}`, config)
  return data
}
