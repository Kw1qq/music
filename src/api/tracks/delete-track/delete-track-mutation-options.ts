import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import { clearTrackCache } from '../get-track/get-track'
import { deleteTrack } from './delete-track'

export const deleteTrackMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => deleteTrack(id, config),
    onSuccess: (_, id, ___, { client }) => {
      clearTrackCache(id)
      client.removeQueries({ queryKey: ['tracks', id] })
      client.invalidateQueries({ queryKey: ['tracks'] })
      client.invalidateQueries({ queryKey: ['playlists'] })
      client.invalidateQueries({ queryKey: ['albums'] })
      client.invalidateQueries({ queryKey: ['search', { type: 'track' }] })
      client.invalidateQueries({ queryKey: ['artists'] })

      const { removeFromQueue } = usePlayerStore.getState()
      removeFromQueue({ trackId: id })
    }
  })
