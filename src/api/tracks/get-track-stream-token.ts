import { useAuthStore } from '@/features/auth/use-auth-store'

import { api } from '../instance'

export const getTrackStreamToken = async (trackId: string) => {
  const { data } = await api.get<{ token: string }>(`/tracks/${trackId}/stream-token`)

  useAuthStore.getState().setAuth({ streamToken: data.token })

  return data.token
}
