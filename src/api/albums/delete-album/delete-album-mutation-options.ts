import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { deleteAlbum } from './delete-album'

export const deleteAlbumMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (albumId: string) => deleteAlbum(albumId, config),
    onSuccess: (_, albumId, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['albums', albumId] })
      client.invalidateQueries({ queryKey: ['search', { type: 'album' }] })
      client.invalidateQueries({ queryKey: ['artists'] })
    }
  })
