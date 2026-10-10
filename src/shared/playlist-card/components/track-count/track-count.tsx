import clsx from 'clsx'

import { pluralizeTracks } from '@/utils/pluralize-track'

import { usePlaylistContext } from '../context'

import styles from './track-count.module.css'

interface TrackCountProps {
  className?: string
}

const TrackCount = (props: TrackCountProps) => {
  const { className } = props

  const { trackCount } = usePlaylistContext()

  return <p className={clsx(styles.subtitle, className)}>{pluralizeTracks(trackCount)}</p>
}

export default TrackCount
