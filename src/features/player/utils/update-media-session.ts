import { BASE_URL } from '@/api/constants/base-url'
import { getTrackQueryOptions } from '@/api/tracks/get-track/get-track-query-options'
import { queryClient } from '@/app/main'
import { getSignedMediaUrl } from '@/utils/get-signed-media-url'

import { usePlayerStore } from '../core/use-player-store'

export const updateMediaSession = async (trackId: string) => {
  if (!('mediaSession' in navigator)) return

  try {
    const track = await queryClient.query(getTrackQueryOptions(trackId))

    if (usePlayerStore.getState().currentTrackId !== trackId) {
      return
    }

    const coverUrl = getSignedMediaUrl(`${BASE_URL}${track.cover}`)
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artists.map(({ name }) => name).join(', '),
      artwork: track.cover
        ? [
          { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
          { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
          { src: coverUrl, sizes: '512x512', type: 'image/jpeg' }
        ]
        : []
    })
  } catch (err) {
    console.warn('Не удалось обновить Media Session:', err)
  }
}
