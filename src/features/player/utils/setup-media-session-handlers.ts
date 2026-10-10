import type { StoreApi } from 'zustand'

import type { IUsePlayerStore } from '@/features/player/core/use-player-store'

export function setupMediaSessionHandlers(store: StoreApi<IUsePlayerStore>) {
  if (!('mediaSession' in navigator)) {
    return
  }

  navigator.mediaSession.setActionHandler('play', () => store.getState().togglePlay())
  navigator.mediaSession.setActionHandler('pause', () => store.getState().togglePlay())
  navigator.mediaSession.setActionHandler('previoustrack', () => store.getState().prev())
  navigator.mediaSession.setActionHandler('nexttrack', () => store.getState().next())
}
