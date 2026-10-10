import { Collapse } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

import { getLikedTracksQueryOptions } from '@/api/tracks/get-liked-tracks/get-liked-tracks-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'
import { recoverSearchParams } from '@/utils/recover-search-params'
import { saveSearchParams } from '@/utils/save-search-params'

import LikesHeader from './-components/likes-header'
import List from './-components/list'

const searchSchema = z.object({
  s: z.optional(z.string()),
  sort: z.optional(z.enum(['recent', 'title', 'artist']))
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/likes/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: ({ routeId, search }) => {
    recoverSearchParams(routeId, search)
  },
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.query(getLikedTracksQueryOptions())
  },
  onLeave: ({ search, routeId }) => {
    saveSearchParams(routeId, search)
  }
})

function RouteComponent() {
  const { s } = Route.useSearch()
  const [isFocus, setIsFocus] = useState(false)

  const isSearches = !isFocus && !s

  return (
    <>
      <SearchInput
        placeholder='Трек, исполнитель'
        route={Route.id}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />
      <Collapse expanded={isSearches}>
        <LikesHeader />
      </Collapse>
      <List />
    </>
  )
}
