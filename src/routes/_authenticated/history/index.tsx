import { Collapse } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

import { getHistoryQueryOptions } from '@/api/tracks/get-history/get-history-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import SearchInput from '@/routes/-components/search-input'
import { recoverSearchParams } from '@/utils/recover-search-params'
import { saveSearchParams } from '@/utils/save-search-params'

import HistoryHeader from './-components/history-header'
import List from './-components/list'

const searchSchema = z.object({
  s: z.optional(z.string()),
  date: z.optional(z.string().nullable())
})

export const Route = createFileRoute('/_authenticated/history/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: ({ routeId, search }) => {
    recoverSearchParams(routeId, search)
  },
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.query(getHistoryQueryOptions())
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
        placeholder='трек, испольнитель'
        route={Route.id}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />
      <Collapse expanded={isSearches}>
        <HistoryHeader />
      </Collapse>
      <List />
    </>
  )
}
