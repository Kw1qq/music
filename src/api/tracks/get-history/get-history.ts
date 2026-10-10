import type { AxiosRequestConfig } from 'axios'

import type { HistoryTrack } from '@/api/types/history-track'

import { api } from '@/api/instance'

export const getHistory = async (config?: AxiosRequestConfig) => {
  const { data } = await api.get<HistoryTrack[]>('/tracks/history', config)

  return data
}
