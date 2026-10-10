import type { AxiosRequestConfig } from 'axios'

import { api } from '@/api/instance'

interface getMeResponse {
  avatarUrl: string
  email: string
  name: string
}

export const getMe = async (config?: AxiosRequestConfig) => {
  const { data } = await api.get<getMeResponse>('/auth/me', config)

  return data
}
