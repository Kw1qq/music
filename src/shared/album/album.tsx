import { useQuery } from '@tanstack/react-query'

import type { Album as AlbumType } from '@/api/types/album'

import { getAlbumQueryOptions } from '@/api/albums/get-album/get-album-query-options'
import { useIsTouch } from '@/hooks/use-is-touch'
import AlbumCard from '@/shared/album-card'

import styles from './album.module.css'

interface AlbumProps {
  album: AlbumType
}

const Album = (props: AlbumProps) => {
  const { album } = props

  const isLoading = album.status === 'processing'
  const getAlbumQuery = useQuery({
    ...getAlbumQueryOptions(album.albumId),
    enabled: !!album.existingAlbum
  })

  const isTouch = useIsTouch()

  return (
    <AlbumCard.Provider album={getAlbumQuery.data ?? album}>
      <AlbumCard>
        <AlbumCard.Link className={styles.link}>
          <AlbumCard.CoverActions isLoading={isLoading}>
            <AlbumCard.Menu>
              {!album.existingAlbum && <AlbumCard.Menu.Download />}
              {!!album.existingAlbum && (
                <>
                  <AlbumCard.Menu.Like />
                  <AlbumCard.Menu.AddNext />
                  <AlbumCard.Menu.AddToEnd />
                </>
              )}
              {album.existingAlbum?.isOwner && <AlbumCard.Menu.Delete />}
            </AlbumCard.Menu>
            {!!album.existingAlbum && <AlbumCard.Actions />}
          </AlbumCard.CoverActions>
        </AlbumCard.Link>

        <AlbumCard.Data>
          <AlbumCard.Link>
            <AlbumCard.Title />
          </AlbumCard.Link>
          <AlbumCard.Artist isLink={!isTouch} />
          <AlbumCard.Year />
        </AlbumCard.Data>
      </AlbumCard>
    </AlbumCard.Provider>
  )
}

export default Album
