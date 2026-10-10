import type { AxiosRequestConfig } from 'axios'

import { mutationOptions } from '@tanstack/react-query'

import type { SearchHistoryItem } from '@/api/types/search-history-item'

import { deleteHistoryFromSearch } from './delete-history-from-search'

export const deleteHistoryFromSearchMutationOption = (config?: AxiosRequestConfig) =>
  mutationOptions({
    mutationFn: (id?: string) => deleteHistoryFromSearch(id, config),
    onMutate: async (id, { client }) => {
      await client.cancelQueries({ queryKey: ['history'] })

      const prev = client.getQueryData<SearchHistoryItem[]>(['history'])

      client.setQueryData<SearchHistoryItem[]>(['history'], (history) =>
        id !== undefined ? history?.filter((item) => item.id === id) : undefined
      )

      return { prev }
    },
    onError: (_, __, variables, { client }) => {
      if (variables) {
        client.setQueryData(['history'], variables.prev)
      }
    },
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ['history'] })
    }
  })
