import { Collapse } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'

import AlbumsHeader from './-components/albums-header'
import AlbumsList from './-components/albums-list'

const searchSchema = z.object({
  s: z.optional(z.string()),
  sort: z.optional(z.enum(['default', 'title', 'release']))
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/artist/$id/albums/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await queryClient.query(getArtistQueryOptions(id))
  }
})

function RouteComponent() {
  const { s } = Route.useSearch()
  const [isFocus, setIsFocus] = useState(false)

  const isSearches = !s && !isFocus

  return (
    <>
      <SearchInput
        placeholder='Альбом'
        route={Route.id}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />
      <Collapse expanded={isSearches}>
        <AlbumsHeader />
      </Collapse>
      <AlbumsList />
    </>
  )
}
