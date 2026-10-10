import { Collapse } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

import { getMinePlaylistsQueryOptions } from '@/api/playlists/get-mine-playlists/get-mine-playlists-query-options'
import { getLikedTracksQueryOptions } from '@/api/tracks/get-liked-tracks/get-liked-tracks-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'
import { recoverSearchParams } from '@/utils/recover-search-params'
import { saveSearchParams } from '@/utils/save-search-params'

import CreatePlaylist from './-components/create-playlist'
import LibraryHeader from './-components/library-header'
import List from './-components/list'
import UserActivity from './-components/user-activity'

const searchSchema = z.object({
  s: z.optional(z.string()),
  filter: z.optional(z.enum(['all', 'liked', 'own'])),
  sort: z.optional(z.enum(['recent', 'title', 'ascending', 'descending']))
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/library/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: ({ routeId, search }) => {
    recoverSearchParams(routeId, search)
  },
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.query(getLikedTracksQueryOptions()),
      queryClient.query(getMinePlaylistsQueryOptions())
    ])
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
      <LibraryHeader>
        <SearchInput
          placeholder='Плейлист'
          route={Route.id}
          style={{ flexGrow: 1 }}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CreatePlaylist />
      </LibraryHeader>

      <Collapse expanded={isSearches}>
        <UserActivity />
      </Collapse>
      <List />
    </>
  )
}
