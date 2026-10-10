import { useAuthStore } from '@/features/auth/use-auth-store'

import { api } from '../instance'

export const logout = async () => {
  await api.post('/auth/logout')
  useAuthStore.getState().logout()
}
