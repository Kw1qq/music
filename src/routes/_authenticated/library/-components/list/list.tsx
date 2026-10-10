import { useSuspenseQuery } from '@tanstack/react-query'

import { getMinePlaylistsQueryOptions } from '@/api/playlists/get-mine-playlists/get-mine-playlists-query-options'
import Grid from '@/shared/ui/grid'

import { Route } from '../..'
import Filters from '../filters'
import Playlist from '../playlist'
import { filterByType } from './utils/filter-by-type'
import { searchByName } from './utils/search-by-name'
import { sortPlaylists } from './utils/sort-playlists'

import styles from './list.module.css'

const List = () => {
  const getMinePlaylistQuery = useSuspenseQuery(getMinePlaylistsQueryOptions())
  const { s, sort, filter } = Route.useSearch()
  const playlists = getMinePlaylistQuery.data

  if (playlists.length === 0) {
    return <div className={styles.empty}>У вас нет плейлистов</div>
  }

  const filteredPlaylists = searchByName(filterByType(playlists, filter), s)
  const sortedPlaylists = sortPlaylists(filteredPlaylists, sort)

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Плейлисты</h2>
      <Filters />
      <Grid
        data={sortedPlaylists}
        getKey={(playlist) => playlist.id}
        render={(playlist) => <Playlist playlist={playlist} />}
      />
    </div>
  )
}

export default List
