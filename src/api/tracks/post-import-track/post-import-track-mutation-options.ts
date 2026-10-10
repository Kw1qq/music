import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import { postImportTrack } from './post-import-track'

export const postImportTrackMutationOptions = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: ({ url }: { url: string; albumId?: string }) => postImportTrack(url, config),
    onSuccess: (_, { albumId }, ___, context) => {
      const { client } = context
      client.invalidateQueries({ queryKey: ['search', { type: 'track' }] })
      client.invalidateQueries({ queryKey: ['albums', albumId] })
      client.invalidateQueries({ queryKey: ['artists'] })
      client.invalidateQueries({ queryKey: ['tracks'] })
    }
  })
