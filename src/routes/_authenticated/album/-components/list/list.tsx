import { useSuspenseQuery } from '@tanstack/react-query'

import { getLikedAlbumsQueryOptions } from '@/api/albums/get-liked-albums/get-liked-albums-query-options'
import Empty from '@/routes/-components/empty'
import Album from '@/shared/album'
import Grid from '@/shared/ui/grid'
import { searchAlbumByName } from '@/utils/search-album-by-name'

import { Route } from '../..'
import Filters from '../filters'
import { sortAlbums } from './utils/sort-albums'

import styles from './list.module.css'

const List = () => {
  const getLikedAlbumsQuery = useSuspenseQuery(getLikedAlbumsQueryOptions())
  const { s, sort } = Route.useSearch()

  const albums = getLikedAlbumsQuery.data

  if (albums.length === 0) {
    return <Empty />
  }
  const filteredAlbums = searchAlbumByName(albums, s)
  const sortedAlbums = sortAlbums(filteredAlbums, sort)

  return (
    <div className={styles.wrapper}>
      <Filters />
      <Grid
        data={sortedAlbums}
        getKey={(album) => album.albumId}
        render={(album) => <Album album={album} />}
      />
    </div>
  )
}

export default List
