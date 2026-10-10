import { useSuspenseQuery } from '@tanstack/react-query'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'

import { Route } from '../..'
import LinkChevron from '../link-chevron'
import Track from '../track'

import styles from './tracks-list.module.css'

const TracksList = () => {
  const { id } = Route.useParams()

  const getArtistQuery = useSuspenseQuery(getArtistQueryOptions(id))

  const tracks = getArtistQuery.data.topSongs

  if (tracks.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <LinkChevron params={{ id }} to='/artist/$id/tracks'>
        Топ треков
      </LinkChevron>
      <ul className={styles.list}>
        {tracks.map((track) => (
          <li key={track.videoId} className={styles.item}>
            <Track track={track} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TracksList
