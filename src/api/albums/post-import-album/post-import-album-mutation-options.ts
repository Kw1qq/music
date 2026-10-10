import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { postImportAlbum } from './post-import-album'

export const postImportAlbumMutationOptions = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (albumId: string) => postImportAlbum(albumId, config),
    onSuccess: (_, albumId, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['albums', albumId] })
      client.invalidateQueries({ queryKey: ['search', { type: 'album' }] })
      client.invalidateQueries({ queryKey: ['artists'] })
    }
  })
