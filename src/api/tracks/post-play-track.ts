import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export const postPlayTrack = async (id: string, config?: AxiosRequestConfig) => {
  await api.post(`/tracks/${id}/play`, {}, config)
}
