import { queryClient } from '@/app/main'
import { useAuthStore } from '@/features/auth/use-auth-store'

import { BASE_URL } from './constants/base-url'
import { clearTrackCache } from './tracks/get-track/get-track'

let es: EventSource

useAuthStore.subscribe(
  ({ auth }) => auth.mediaToken,
  (mediaToken) => {
    es?.close()

    es = new EventSource(`${BASE_URL}/tracks/events?token=${mediaToken}`)

    es.addEventListener('track-updated', (e) => {
      const { id } = JSON.parse(e.data) as { id: string }
      clearTrackCache(id)
      queryClient.invalidateQueries({ queryKey: ['tracks', id] })
    })

    es.addEventListener('album-updated', (e) => {
      const { id } = JSON.parse(e.data) as { id: string }
      queryClient.invalidateQueries({ queryKey: ['albums', id] })
    })
  }
)
