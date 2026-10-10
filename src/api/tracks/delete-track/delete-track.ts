import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export const deleteTrack = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await api.delete(`/tracks/${id}`, config)
  return data
}
