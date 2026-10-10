import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

export const deletePlaylist = async (id: string, config?: AxiosRequestConfig) => {
  const res = await api.delete(`/playlists/${id}`, config)
  return res
}
