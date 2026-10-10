import { useMediaQuery } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { motion, useScroll, useTransform } from 'motion/react'

import { getArtistQueryOptions } from '@/api/artists/get-artist/get-artist-query-options'
import Background from '@/routes/-components/background'
import { useContainerContext } from '@/routes/-layout/content/content'

import { Route } from '../..'

import styles from './artist-header.module.css'

const ArtistHeader = () => {
  const { id } = Route.useParams()

  const getArtistQuery = useSuspenseQuery(getArtistQueryOptions(id))

  const artist = getArtistQuery.data

  const containerRef = useContainerContext()

  const { scrollY } = useScroll({
    container: { current: containerRef }
  })

  const isTablet = useMediaQuery('(width < 900px)')

  const breakPoint = isTablet ? 200 : 270

  const size = useTransform(scrollY, [90, breakPoint], [isTablet ? 110 : 200, 60])
  const opacity = useTransform(scrollY, [180, breakPoint], [0, 1])
  const scale = useTransform(scrollY, [90, breakPoint], [1, 0.8])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.inner}>
          <motion.img
            alt='Аватарка'
            className={styles.image}
            src={artist.thumbnail!}
            style={{ width: size, height: size }}
          />
          <motion.div className={styles.data} style={{ scale }}>
            <h1 className={styles.title}>{artist.name}</h1>
            <p className={styles.subscribers}>{artist.subscriberCount} подписчиков</p>
          </motion.div>
          <motion.div className={styles.background} style={{ opacity }} />
        </div>
      </div>

      <Background
        className={styles.banner}
        style={{ backgroundImage: `url(${artist.thumbnail!})` }}
      />
    </>
  )
}

export default ArtistHeader
