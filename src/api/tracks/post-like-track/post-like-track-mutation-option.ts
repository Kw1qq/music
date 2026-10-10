import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { Track } from '@/api/types/track'

import { postLikeTrack } from './post-like-track'

export const postLikeTrackMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => postLikeTrack(id, config),
    onMutate: async (id, { client }) => {
      await client.cancelQueries({ queryKey: ['tracks', id] })

      const prev = client.getQueryData<Track>(['tracks', id])

      client.setQueryData<Track>(['tracks', id], (track) => {
        if (!track) {
          return
        }

        return {
          ...track,
          likedAt: new Date().toISOString()
        }
      })

      return { prev }
    },
    onError: (_, id, variables, { client }) => {
      if (variables) {
        client.setQueryData(['tracks', id], variables.prev)
      }
    },
    onSuccess: (track, id, ___, { client }) => {
      client.setQueryData(['tracks', id], track)
      client.invalidateQueries({ queryKey: ['tracks', 'liked'] })
    }
  })
