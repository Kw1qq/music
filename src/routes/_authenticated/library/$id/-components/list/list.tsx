import { useSuspenseQuery } from '@tanstack/react-query'

import { getPlaylistQueryOptions } from '@/api/playlists/get-playlist/get-playlist-query-options'
import Empty from '@/routes/-components/empty'
import { useContainerContext } from '@/routes/-layout/content/content'
import VirtualizeList from '@/shared/virtualize-list'
import { searchTracksByName } from '@/utils/search-tracks-by-name'

import { Route } from '../..'
import Sorts from '../sorts'
import Track from '../track'
import { sortTracks } from './utils/sort-tracks'

import styles from './list.module.css'

const List = () => {
  const { id } = Route.useParams()

  const getLikedTracksQuery = useSuspenseQuery(getPlaylistQueryOptions(id))
  const { s, sort } = Route.useSearch()

  const tracks = getLikedTracksQuery.data.tracks

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
              <Track
                index={virtualItem.index}
                isOwner={getLikedTracksQuery.data.isOwner}
                playlistId={id}
                queue={ids}
                trackId={track.id}
              />
            </li>
          )
        }}
        count={sortedTracks.length}
        estimateSize={() => 80}
        gap={10}
        listClassName={styles.list}
        overscan={6}
        scrollMargin={0}
        viewportRef={viewportRef}
      />
    </div>
  )
}

export default List
