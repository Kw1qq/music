import { useAuthStore } from '@/features/auth/use-auth-store'

export const getSignedMediaUrl = (url: string) => {
  const { mediaToken } = useAuthStore.getState().auth

  const parsed = new URL(url, window.location.origin)
  if (mediaToken) {
    parsed.searchParams.set('token', mediaToken)
  }

  return parsed.toString()
}
