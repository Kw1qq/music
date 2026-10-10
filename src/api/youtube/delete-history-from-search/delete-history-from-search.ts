import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export const deleteHistoryFromSearch = async (id?: string, config?: AxiosRequestConfig) => {
  await api.delete(`youtube/search/history${id ? `/${id}` : ''}`, config)
}
