import type { ReactNode } from 'react'

import { createContext, use } from 'react'

import type { PlaylistSummary } from '@/api/types/playlist-summary'

export const Context = createContext<PlaylistSummary | null>(null)

interface ProviderProps {
  children: ReactNode | ReactNode[]
  playlist: PlaylistSummary
}

export const Provider = (props: ProviderProps) => {
  const { children, playlist } = props

  return <Context value={playlist}>{children}</Context>
}

export const usePlaylistContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('the context was not found')
  }

  return context
}
