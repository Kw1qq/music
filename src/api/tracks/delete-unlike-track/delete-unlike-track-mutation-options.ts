import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { Track } from '@/api/types/track'

import { postUnlikeTrack } from './delete-unlike-track'

export const postUnlikeTrackMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id: string) => postUnlikeTrack(id, config),
    onMutate: async (id, { client }) => {
      await client.cancelQueries({ queryKey: ['tracks', id] })

      const prev = client.getQueryData<Track>(['tracks', id])

      client.setQueryData<Track>(['tracks', id], (track) => {
        if (!track) {
          return
        }

        return {
          ...track,
          likedAt: null
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
