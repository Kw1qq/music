import type { ArtistSummary } from '@/api/types/artist-summary'

import ArtistCard from '@/shared/artist-card'

import styles from './artist.module.css'

interface ArtistProps {
  artist: ArtistSummary
}

const Artist = (props: ArtistProps) => {
  const { artist } = props

  return (
    <ArtistCard artist={artist} classname={styles.card}>
      <ArtistCard.Wrapper classname={styles.wrapper}>
        <ArtistCard.Avatar classname={styles.avatar} />
        <ArtistCard.Name className={styles.name} />
      </ArtistCard.Wrapper>
    </ArtistCard>
  )
}

export default Artist
