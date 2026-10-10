import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { Album } from '@/api/types/album'

import { deleteUnlikeAlbum } from './delete-unlike-album'

export const deleteUnlikeAlbumMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (albumId: string) => deleteUnlikeAlbum(albumId, config),
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
            isLiked: false
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
