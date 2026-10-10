import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { queryClient, router } from '@/app/main'

interface IUseAuthStore {
  auth: {
    accessToken: string | null
    mediaToken: string | null
    streamToken: string | null
  }
  logout: () => void
  setAuth: (auth: Partial<IUseAuthStore['auth']>) => void
}

export const useAuthStore = create<IUseAuthStore>()(
  subscribeWithSelector((set) => ({
    auth: {
      accessToken: null,
      mediaToken: null,
      streamToken: null
    },
    setAuth: (auth) => {
      set((prevAuth) => ({
        auth: { ...prevAuth.auth, ...auth }
      }))
    },
    logout: () => {
      set({ auth: { accessToken: null, mediaToken: null, streamToken: null } })
      router.navigate({
        to: '/login'
      })
      queryClient.clear()
    }
  }))
)
