import type { ArtistsListProps } from '@/shared/artists-list/artists-list'

import ArtistsDrawer from '@/shared/artists-drawer'
import ArtistsList from '@/shared/artists-list'

import { useAlbumContext, useArtistsDrawerContext } from '../context'

type ArtistProps = Omit<ArtistsListProps, 'artists' | 'open'>

const Artist = (props: ArtistProps) => {
  const { artists } = useAlbumContext()
  const { open, isExpanded, close } = useArtistsDrawerContext()

  return (
    <>
      <ArtistsList {...props} artists={artists} open={open} />
      <ArtistsDrawer artists={artists} close={close} opened={isExpanded} />
    </>
  )
}

export default Artist
