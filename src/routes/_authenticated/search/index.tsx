import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import { getYoutubeSearchInfinityQueryOptions } from '@/api/youtube/get-youtube-search/get-youtube-search-infinity-query-options'
import ErrorComponent from '@/routes/-components/error-component'
import { recoverSearchParams } from '@/utils/recover-search-params'
import { saveSearchParams } from '@/utils/save-search-params'

import Empty from './-components/empty'
import Filters from './-components/filters'
import List from './-components/list'
import SearchHeader from './-components/search-header'
import SearchInput from './-components/search-input'

const searchSchema = z.object({
  s: z.optional(z.string()),
  type: z.optional(z.enum(['artist', 'track', 'album']))
})

export const Route = createFileRoute('/_authenticated/search/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  validateSearch: searchSchema,

  beforeLoad: ({ routeId, search }) => {
    recoverSearchParams(routeId, search)
  },
  loaderDeps: ({ search }) => ({
    s: search.s,
    type: search.type
  }),
  loader: ({ context, deps }) => {
    const { queryClient } = context
    queryClient.infiniteQuery(
      getYoutubeSearchInfinityQueryOptions({ search: deps.s ?? '', type: deps.type ?? 'track' })
    )
  },

  onLeave: ({ search, routeId }) => {
    saveSearchParams(routeId, search)
  }
})

function RouteComponent() {
  const { s } = Route.useSearch()

  return (
    <>
      <SearchHeader>
        <SearchInput />
        {!!s && <Filters />}
      </SearchHeader>
      {s ? <List /> : <Empty />}
    </>
  )
}
