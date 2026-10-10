import clsx from 'clsx'

import type { PlaylistSummary } from '@/api/types/playlist-summary'

import PlaylistCard from '@/shared/playlist-card'

import styles from './playlist.module.css'

interface PlaylistProps {
  isSelect: boolean
  playlist: PlaylistSummary
  onSelect: () => void
}

const Playlist = (props: PlaylistProps) => {
  const { playlist, onSelect, isSelect } = props

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <PlaylistCard.Context value={playlist}>
      <PlaylistCard
        className={clsx(styles.card, isSelect && styles.selected)}
        role='button'
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={handleKeyDown}
      >
        <PlaylistCard.Cover />
        <PlaylistCard.Data>
          <PlaylistCard.Title className={styles.title} />
          <PlaylistCard.TrackCount />
        </PlaylistCard.Data>
      </PlaylistCard>
    </PlaylistCard.Context>
  )
}

export default Playlist
