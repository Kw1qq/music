import { use } from 'react'

import type { Artists } from '@/api/types/artists'
import type { ArtistsListProps } from '@/shared/artists-list/artists-list'

import ArtistsDrawer from '@/shared/artists-drawer'
import ArtistsList from '@/shared/artists-list'

import { Context, useArtistsDrawerContext } from '../context'

export interface ArtistProps extends Omit<ArtistsListProps, 'artists' | 'open'> {
  artists?: Artists
}

const Artist = (props: ArtistProps) => {
  const { artists, onNavigate } = props

  const { open, isExpanded, close } = useArtistsDrawerContext()

  let artistsList = artists

  if (artistsList === undefined) {
    const context = use(Context)

    if (!context) {
      throw new Error('Контекст не найден, а children не переданы')
    }

    artistsList = context.artists
  }

  return (
    <>
      <ArtistsList {...props} artists={artistsList} open={open} />
      <ArtistsDrawer
        artists={artistsList}
        close={close}
        opened={isExpanded}
        onNavigate={onNavigate}
      />
    </>
  )
}

export default Artist
