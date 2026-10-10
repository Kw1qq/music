import type { ReactNode } from 'react'

import clsx from 'clsx'
import { use, useRef } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'
import { useIsTouch } from '@/hooks/use-is-touch'

import AddToPlaylistDrawer from './components/add-to-playlist-drawer'
import Artist from './components/artist'
import { Context, Provider } from './components/context'
import Cover from './components/cover'
import CoverAction from './components/cover-action'
import CoverDownload from './components/cover-download'
import CoverPlayer from './components/cover-player'
import Data from './components/data'
import Duration from './components/duration'
import Menu from './components/menu'
import Title from './components/title'
import Wrapper from './components/wrapper'
import { interactiveSelector } from './constants/interactive-selector'

import styles from './track-card.module.css'

interface TrackCardProps {
  children: ReactNode | ReactNode[]
  className?: string
  onPlay: () => void
}

const TrackCard = (props: TrackCardProps) => {
  const { children, className, onPlay } = props

  const context = use(Context)

  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const cardRef = useRef<HTMLDivElement>(null)

  const isTouch = useIsTouch()

  const isCurrentTrack = currentTrackId === context?.id

  const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    const closestInteractiveElement = target.closest(interactiveSelector)

    if (isTouch && context && closestInteractiveElement === e.currentTarget) {
      if (!isCurrentTrack) {
        onPlay()
      }
    }
  }

  return (
    <div
      ref={cardRef}
      className={clsx(styles.card, className)}
      role='button'
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={() => {}}
    >
      {children}
    </div>
  )
}

TrackCard.Wrapper = Wrapper
TrackCard.Artist = Artist

TrackCard.Data = Data
TrackCard.Duration = Duration
TrackCard.Title = Title
TrackCard.Provider = Provider
TrackCard.Cover = Cover
TrackCard.CoverAction = CoverAction
TrackCard.CoverPlayer = CoverPlayer
TrackCard.CoverDownload = CoverDownload
TrackCard.Menu = Menu
TrackCard.AddToPlaylistDrawer = AddToPlaylistDrawer

export default TrackCard
