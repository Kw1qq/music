import { useSuspenseQuery } from '@tanstack/react-query'

import { getArtistsTracksQueryOptions } from '@/api/artists/get-artists-tracks/get-artists-tracks-query-options'
import Empty from '@/routes/-components/empty'
import { useContainerContext } from '@/routes/-layout/content/content'
import VirtualizeList from '@/shared/virtualize-list'
import { searchTracksByName } from '@/utils/search-tracks-by-name'

import { Route } from '../..'
import Track from '../track'

import styles from './list.module.css'

const List = () => {
  const { id } = Route.useParams()

  const getArtistsTracksQuery = useSuspenseQuery(getArtistsTracksQueryOptions(id))
  const { s } = Route.useSearch()

  const tracks = getArtistsTracksQuery.data.tracks

  const filteredTracks = searchTracksByName(tracks, s)

  const viewportRef = useContainerContext()

  if (tracks.length === 0) {
    return <Empty />
  }

  return (
    <div className={styles.wrapper}>
      <VirtualizeList
        render={(virtualItem) => {
          const track = filteredTracks[virtualItem.index]

          return (
            <li key={track.videoId} className={styles.item}>
              <Track track={track} />
            </li>
          )
        }}
        count={filteredTracks.length}
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
