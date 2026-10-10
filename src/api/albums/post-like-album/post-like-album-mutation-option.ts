import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { Album } from '@/api/types/album'

import { postLikeAlbum } from './post-like-album'

export const postLikeAlbumMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (albumId: string) => postLikeAlbum(albumId, config),
    onMutate: async (albumId, { client }) => {
      await client.cancelQueries({ queryKey: ['albums', albumId] })

      const prev = client.getQueryData<Album>(['albums', albumId])

      client.setQueryData<Album>(['albums', albumId], (album) => {
        if (!album) {
          return
        }

        if (!album.existingAlbum) {
          return album
        }

        return {
          ...album,
          existingAlbum: {
            ...album.existingAlbum,
            isLiked: true
          }
        }
      })

      return { prev }
    },
    onError: (_, albumId, variables, { client }) => {
      if (variables) {
        client.setQueryData(['albums', albumId], variables.prev)
      }
    },
    onSuccess: (_, albumId, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['albums', albumId] })
      client.invalidateQueries({ queryKey: ['albums', 'liked'] })
    }
  })
