import { useAuthStore } from '@/features/auth/use-auth-store'

import { refreshClient } from '../instance'

interface RefreshAuthResponse {
  accessToken: string
  email: string
  mediaToken: string
}

export const refreshAuth = async () => {
  const { data } = await refreshClient.post<RefreshAuthResponse>('/auth/refresh')

  const { accessToken, mediaToken } = data

  useAuthStore.getState().setAuth({ accessToken, mediaToken })

  return data
}
