import { Collapse } from '@mantine/core'
import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import z from 'zod'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'

import AlbumView from './-components/album-view'
import List from './-components/list'

const searchSchema = z.object({
  s: z.optional(z.string())
})

export type SeacrhType = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_authenticated/album/$id/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    try {
      await queryClient.query(getAlbumQueryOptions(id))
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 502) {
        throw notFound()
      }
      throw err
    }
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
        <AlbumView />
      </Collapse>
      <List />
    </>
  )
}
