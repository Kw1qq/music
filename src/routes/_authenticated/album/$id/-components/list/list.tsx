import { useSuspenseQuery } from '@tanstack/react-query'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { searchTracksByName } from '@/utils/search-tracks-by-name'

import { Route } from '../..'
import Track from '../track'

import styles from './list.module.css'

const List = () => {
  const { s } = Route.useSearch()
  const { id } = Route.useParams()
  const getHistoryQuery = useSuspenseQuery(getAlbumQueryOptions(id))

  const tracks = getHistoryQuery.data.tracks
  const filteredTracks = searchTracksByName(tracks, s)
  const queue = getHistoryQuery.data.existingAlbum
    ? tracks.map(({ existingTrack }) => existingTrack?.id).filter((t) => t !== undefined)
    : undefined

  return (
    <ul className={styles.list}>
      {filteredTracks.map((track) => (
        <li key={track.position} className={styles.item}>
          <Track albumId={getHistoryQuery.data.albumId} queue={queue} track={track} />
        </li>
      ))}
    </ul>
  )
}

export default List
