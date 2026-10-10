import type { AxiosError } from 'axios'

import { create } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { useAuthStore } from '@/features/auth/use-auth-store'

import { refreshAuth } from './auth/refresh-auth'
import { BASE_URL } from './constants/base-url'

import './sse'

export const api = create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const refreshClient = create({
  baseURL: BASE_URL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState().auth
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

async function refreshAuthLogic(failedRequest: AxiosError) {
  try {
    const { accessToken } = await refreshAuth()

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
    }

    return Promise.resolve()
  } catch (err) {
    useAuthStore.getState().logout()
    return Promise.reject(err)
  }
}

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401]
})
