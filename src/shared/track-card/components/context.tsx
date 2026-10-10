import type { ReactNode } from 'react'

import { createContext, use } from 'react'

import type { Track } from '@/api/types/track'

import { useExpanded } from '@/hooks/use-expanded'

interface DrawerContextType {
  isExpanded: boolean
  close: () => void
  open: () => void
}

export const Context = createContext<Track | null>(null)
const AddToPalylistDrawerContext = createContext<DrawerContextType | null>(null)
const ArtistsDrawerContext = createContext<DrawerContextType | null>(null)

interface ProviderProps {
  children: ReactNode | ReactNode[]
  track: Track | null
}

export const Provider = (props: ProviderProps) => {
  const { children, track } = props
  const addToPalylistExpanded = useExpanded()
  const artistsDrawerExpanded = useExpanded()

  return (
    <AddToPalylistDrawerContext value={addToPalylistExpanded}>
      <ArtistsDrawerContext value={artistsDrawerExpanded}>
        <Context value={track}>{children}</Context>
      </ArtistsDrawerContext>
    </AddToPalylistDrawerContext>
  )
}

export const useTrackContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('the context was not found')
  }

  return context
}

export const useAddToPalylistDrawerContext = () => {
  const context = use(AddToPalylistDrawerContext)

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
