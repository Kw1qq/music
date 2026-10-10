import { Collapse } from '@mantine/core'
import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import z from 'zod'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'
import { recoverSearchParams } from '@/utils/recover-search-params'
import { saveSearchParams } from '@/utils/save-search-params'

import List from './-components/list'
import PlaylistView from './-components/playlist-view'

const searchSchema = z.object({
  s: z.optional(z.string()),
  sort: z.optional(z.enum(['default', 'title', 'artist']))
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/library/$id/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: ({ routeId, search }) => {
    recoverSearchParams(routeId, search)
  },
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    try {
      await queryClient.query(getPlaylistQueryOptions(id))
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw notFound()
      }
      throw err
    }
  },
  onLeave: ({ search, routeId }) => {
    saveSearchParams(routeId, search)
  }
})

function RouteComponent() {
  const { s } = Route.useSearch()
  const [isFocus, setIsFocus] = useState(false)

  const isSearches = !s && !isFocus

  return (
    <>
      <SearchInput
        placeholder='Трек, исполнитель'
        route={Route.id}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />
      <Collapse expanded={isSearches}>
        <PlaylistView />
      </Collapse>
      <List />
    </>
  )
}
