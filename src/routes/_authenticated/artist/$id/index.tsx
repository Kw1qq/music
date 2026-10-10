import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'axios'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import ErrorComponent from '@/routes/-components/error-component'

import AlbumList from './-components/albums-list'
import ArtistHeader from './-components/artist-header'
import SimilarArtistsList from './-components/similar-artists-list'
import TracksList from './-components/tracks-list'

export const Route = createFileRoute('/_authenticated/artist/$id/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    try {
      await queryClient.query(getArtistQueryOptions(id))
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 502) {
        throw notFound()
      }
      throw err
    }
  }
})

function RouteComponent() {
  return (
    <>
      <ArtistHeader />
      <TracksList />
      <AlbumList />
      <SimilarArtistsList />
    </>
  )
}
