import { useAuthStore } from '@/features/auth/use-auth-store'

import { api } from '../instance'

interface SignInWithGoogleResponse {
  accessToken: string
  email: string
  mediaToken: string
}

export const signInWithGoogle = async (credential?: string) => {
  const { data } = await api.post<SignInWithGoogleResponse>('/auth/google', {
    credential
  })

  const { accessToken, mediaToken } = data

  useAuthStore.getState().setAuth({ accessToken, mediaToken })
}
