import { useSuspenseQuery } from '@tanstack/react-query'

import { getLikedTracksQueryOptions } from '@/api/tracks/get-liked-tracks/get-liked-tracks-query-options'
import Empty from '@/routes/-components/empty'
import { useContainerContext } from '@/routes/-layout/content/content'
import VirtualizeList from '@/shared/virtualize-list'
import { searchTracksByName } from '@/utils/search-tracks-by-name'

import { Route } from '../../index'
import Sorts from '../sorts'
import Track from '../track'
import { sortTracks } from './utils/sort-tracks'

import styles from './list.module.css'

const List = () => {
  const getLikedTracksQuery = useSuspenseQuery(getLikedTracksQueryOptions())
  const { s, sort } = Route.useSearch()

  const tracks = getLikedTracksQuery.data

  const filteredTracks = searchTracksByName(tracks, s)
  const sortedTracks = sortTracks(filteredTracks, sort)
  const ids = sortedTracks.map((t) => t.id)

  const viewportRef = useContainerContext()

  if (tracks.length === 0) {
    return <Empty />
  }

  return (
    <div className={styles.wrapper}>
      <Sorts />
      <VirtualizeList
        render={(virtualItem) => {
          const track = sortedTracks[virtualItem.index]

          return (
            <li key={track.id} className={styles.item}>
              <Track index={virtualItem.index} queue={ids} trackId={track.id} />
            </li>
          )
        }}
        count={filteredTracks.length}
        estimateSize={() => 80}
        gap={10}
        listClassName={styles.list}
        overscan={4}
        viewportRef={viewportRef}
      />
    </div>
  )
}

export default List
