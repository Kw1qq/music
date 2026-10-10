import { Loader } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect } from 'react'

import { getYoutubeSearchInfinityQueryOptions } from '@/api/youtube/get-youtube-search/get-youtube-search-infinity-query-options'
import LoaderComponent from '@/routes/-components/loader-component'
import Album from '@/shared/album'
import Grid from '@/shared/ui/grid'

import { Route } from '../..'
import Artist from '../artist'
import TrackCard from '../track'

import styles from './list.module.css'

const List = () => {
  const { s, type = 'track' } = Route.useSearch()

  const getYoutubeSearchInfinityQuery = useInfiniteQuery(
    getYoutubeSearchInfinityQueryOptions({ search: s ?? '', type })
  )

  const { ref, entry } = useIntersection({
    threshold: 0.5
  })

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      getYoutubeSearchInfinityQuery.hasNextPage &&
      !getYoutubeSearchInfinityQuery.isFetchingNextPage
    ) {
      getYoutubeSearchInfinityQuery.fetchNextPage()
    }
  }, [
    entry?.isIntersecting,
    getYoutubeSearchInfinityQuery.hasNextPage,
    getYoutubeSearchInfinityQuery.isFetchingNextPage
  ])

  if (getYoutubeSearchInfinityQuery.isPending) {
    return <LoaderComponent />
  }

  if (!getYoutubeSearchInfinityQuery.data) {
    return null
  }

  const isFetching =
    getYoutubeSearchInfinityQuery.isFetching && !getYoutubeSearchInfinityQuery.isFetchingNextPage

  const responseType = getYoutubeSearchInfinityQuery.data.pages[0].type

  const allTracks = getYoutubeSearchInfinityQuery.data.pages
    .filter((page) => page.type === 'track')
    .flatMap((page) => page.results)
  const allArtists = getYoutubeSearchInfinityQuery.data.pages
    .filter((page) => page.type === 'artist')
    .flatMap((page) => page.results)
  const allAlbums = getYoutubeSearchInfinityQuery.data.pages
    .filter((page) => page.type === 'album')
    .flatMap((page) => page.results)

  return (
    <div className={styles.wrapper}>
      {responseType === 'album' ? (
        <Grid
          className={clsx(styles.grid, isFetching && styles.fetching)}
          data={allAlbums}
          getKey={(album) => album.albumId}
          render={(album) => <Album album={album} />}
        />
      ) : (
        <ul className={clsx(styles.list, isFetching && styles.fetching)}>
          {responseType === 'track' &&
            allTracks.map((track) => (
              <li key={track.url} className={styles.item}>
                <TrackCard track={track} />
              </li>
            ))}
          {responseType === 'artist' &&
            allArtists.map((artist) => (
              <li key={artist.artistId} className={styles.item}>
                <Artist artist={artist} />
              </li>
            ))}
        </ul>
      )}

      <div ref={ref} className={styles.intersection} />
      {getYoutubeSearchInfinityQuery.isFetchingNextPage && (
        <div className={styles.center}>
          <Loader size={32} />
        </div>
      )}
    </div>
  )
}

export default List
