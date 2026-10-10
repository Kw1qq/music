import { useRef } from 'react'

import type { Track } from '@/api/types/track'

import { useExpanded } from '@/hooks/use-expanded'

import PlayerBar from './components/player-bar'
import PlayerOverlay from './components/player-overlay'
import QueueDrawer from './components/queue-drawer'
import { useColor } from './hooks/use-color'
import { usePlayerHotkeys } from './hooks/use-player-hotkeys'

interface PlayerCoreProps {
  currentTrack: Track
}

const PlayerCore = (props: PlayerCoreProps) => {
  const { currentTrack } = props

  usePlayerHotkeys()

  const playerOverlay = useExpanded()
  const drawer = useExpanded()

  const imageRef = useRef<HTMLImageElement>(null)
  const { backgroundColor } = useColor(imageRef, currentTrack.id)

  return (
    <>
      {playerOverlay.isExpanded && (
        <PlayerOverlay
          close={playerOverlay.close}
          color={backgroundColor}
          currentTrack={currentTrack}
          drawerOpen={drawer.open}
          imageRef={imageRef}
        />
      )}

      {!playerOverlay.isExpanded && (
        <PlayerBar
          color={backgroundColor}
          currentTrack={currentTrack}
          drawerOpen={drawer.open}
          imageRef={imageRef}
          open={playerOverlay.open}
        />
      )}

      <QueueDrawer
        close={drawer.close}
        opened={drawer.isExpanded}
        overlayClose={playerOverlay.close}
      />
    </>
  )
}

export default PlayerCore
