import { Collapse } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

import { getArtistsTracksQueryOptions } from '@/api/artists/get-artists-tracks/get-artists-tracks-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'

import List from './-components/list'
import TracksHeader from './-components/tracks-header'

const searchSchema = z.object({
  s: z.optional(z.string())
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/artist/$id/tracks/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await queryClient.query(getArtistsTracksQueryOptions(id))
  }
})

function RouteComponent() {
  const { s } = Route.useSearch()
  const [isFocus, setIsFocus] = useState(false)

  const isSearches = !s && !isFocus

  return (
    <>
      <SearchInput
        placeholder='Трек'
        route={Route.id}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />
      <Collapse expanded={isSearches}>
        <TracksHeader />
      </Collapse>
      <List />
    </>
  )
}
