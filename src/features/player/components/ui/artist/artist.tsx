import clsx from 'clsx'

import type { ArtistProps as ArtistCardProps } from '@/shared/track-card/components/artist/artist'

import TrackCard from '@/shared/track-card'

import styles from './artist.module.css'

interface ArtistProps extends ArtistCardProps {
  className?: string
}

const Artist = (props: ArtistProps) => {
  const { className, ...restProps } = props

  return (
    <TrackCard.Artist
      {...restProps}
      classNames={{
        artist: clsx(styles.artist),
        root: clsx(styles.root, className)
      }}
      linkProps={{
        preload: 'viewport',
        ...restProps.linkProps
      }}
    />
  )
}

export default Artist
