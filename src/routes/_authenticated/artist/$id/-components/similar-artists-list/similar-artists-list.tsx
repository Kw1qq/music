import { ActionIcon, ScrollArea } from '@mantine/core'
import { useScroller } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import { useIsTouch } from '@/hooks/use-is-touch'

import { Route } from '../..'
import Artist from '../artist'

import styles from './similar-artists-list.module.css'

const SimilarArtistsList = () => {
  const { id } = Route.useParams()

  const getArtistQuery = useSuspenseQuery(getArtistQueryOptions(id))

  const similarArtists = getArtistQuery.data.similarArtists

  const scroller = useScroller({ draggable: false, scrollAmount: 500 })

  const isTouch = useIsTouch()

  if (similarArtists.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.title}>Похожие исполнители</p>
        {!isTouch && (
          <div className={styles.actions}>
            <ActionIcon disabled={!scroller.canScrollStart} onClick={scroller.scrollStart}>
              <ChevronLeft />
            </ActionIcon>
            <ActionIcon disabled={!scroller.canScrollEnd} onClick={scroller.scrollEnd}>
              <ChevronRight />
            </ActionIcon>
          </div>
        )}
      </div>
      <ScrollArea type={'never'} viewportRef={scroller.ref}>
        <div className={styles.wrapper}>
          {similarArtists.map((artist) => (
            <Artist key={artist.artistId} artist={artist} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default SimilarArtistsList
