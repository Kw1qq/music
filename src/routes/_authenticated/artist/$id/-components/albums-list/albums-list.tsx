import { useSuspenseQuery } from '@tanstack/react-query'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import Album from '@/shared/album'
import Grid from '@/shared/ui/grid'

import { Route } from '../..'
import LinkChevron from '../link-chevron'

import styles from './albums-list.module.css'

const AlbumList = () => {
  const { id } = Route.useParams()

  const getArtistQuery = useSuspenseQuery(getArtistQueryOptions(id))

  const albums = [...getArtistQuery.data.albums].slice(0, 6)

  return (
    <div className={styles.container}>
      <LinkChevron params={{ id }} to='/artist/$id/albums'>
        Топ Альбомов
      </LinkChevron>
      <Grid
        className={styles.grid}
        data={albums}
        getKey={(album) => album.albumId}
        render={(album) => <Album album={album} />}
      />
    </div>
  )
}

export default AlbumList
