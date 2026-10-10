import type { ReactNode } from 'react'

import { createContext, use } from 'react'

import type { Album } from '@/api/types/album'

import { useExpanded } from '@/hooks/use-expanded'

interface DrawerContextType {
  isExpanded: boolean
  close: () => void
  open: () => void
}

export const Context = createContext<Album | null>(null)
const ArtistsDrawerContext = createContext<DrawerContextType | null>(null)

interface ProviderProps {
  album: Album | null
  children: ReactNode | ReactNode[]
}

export const Provider = (props: ProviderProps) => {
  const { children, album } = props

  const artistsDrawerExpanded = useExpanded()

  return (
    <ArtistsDrawerContext value={artistsDrawerExpanded}>
      <Context value={album}>{children}</Context>
    </ArtistsDrawerContext>
  )
}

export const useAlbumContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('the context was not found')
  }

  return context
}

export const useArtistsDrawerContext = () => {
  const context = use(ArtistsDrawerContext)

  if (!context) {
    throw new Error('the context was not found')
  }

  return context
}
