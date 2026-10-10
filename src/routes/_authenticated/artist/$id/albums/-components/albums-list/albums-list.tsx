import { useSuspenseQuery } from '@tanstack/react-query'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import Album from '@/shared/album'
import Grid from '@/shared/ui/grid'
import { searchAlbumByName } from '@/utils/search-album-by-name'

import { Route } from '../..'
import Filters from '../filters'
import { sortAlbums } from './utils/sort-albums'

import styles from './albums-list.module.css'

const AlbumsList = () => {
  const { id } = Route.useParams()
  const { s, sort } = Route.useSearch()

  const getArtistQuery = useSuspenseQuery(getArtistQueryOptions(id))

  const albums = getArtistQuery.data.albums
  const filteredAlbums = searchAlbumByName(albums, s)
  const sortedAlbums = sortAlbums(filteredAlbums, sort)

  return (
    <div className={styles.wrapper}>
      <Filters />
      <Grid
        className={styles.grid}
        data={sortedAlbums}
        getKey={(album) => album.albumId}
        render={(album) => <Album album={album} />}
      />
    </div>
  )
}

export default AlbumsList
