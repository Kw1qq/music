import { ChevronRight } from 'lucide-react'

import type { ArtistSummary } from '@/api/types/artist-summary'

import ArtistCard from '@/shared/artist-card'

interface ArtistProps {
  artist: ArtistSummary
}

const Artist = (props: ArtistProps) => {
  const { artist } = props

  return (
    <ArtistCard artist={artist}>
      <ArtistCard.Wrapper>
        <ArtistCard.Avatar />
        <ArtistCard.Name />
      </ArtistCard.Wrapper>
      <ChevronRight size={24} />
    </ArtistCard>
  )
}

export default Artist
