import { ActionIcon, Menu } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { EllipsisVertical, ListEnd, ListStart, Shuffle } from 'lucide-react'

import { getLikedTracksQueryOptions } from '@/api/tracks/get-liked-tracks/get-liked-tracks-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import { pluralizeMinutes } from '@/utils/pluralize-minutes'
import { pluralizeTracks } from '@/utils/pluralize-track'

import Card from '../ui/card'
import PlayButton from '../ui/play-button'

import styles from './likes-card.module.css'

interface LikesCardProps {
  className?: string
}

const LikesCard = (props: LikesCardProps) => {
  const { className } = props

  const getLikedTracksQuery = useSuspenseQuery(getLikedTracksQueryOptions())
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)
  const addNext = usePlayerStore((state) => state.addNext)
  const addToEnd = usePlayerStore((state) => state.addToEnd)
  const queue = usePlayerStore((state) => state.queue)

  const tracksCount = getLikedTracksQuery.data.length
  const tracksDuration = Math.floor(
    getLikedTracksQuery.data.reduce((acc, track) => (track.duration ?? 0) + acc, 0) / 60
  )
  const ids = getLikedTracksQuery.data.map((t) => t.id)
  const isEmpty = ids.length === 0

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    playQueue(ids, 0)
  }
  const handleShuffledPlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    playShuffled(ids)
  }

  return (
    <Card className={clsx(styles.card, className)} to='/likes'>
      <div>
        <Card.Title className={styles.title}>Любимое</Card.Title>
        <Card.Subtitle className={styles.subTitle}>Ваша личная коллекция фаворитов</Card.Subtitle>
        <p className={styles.info}>
          {pluralizeTracks(tracksCount)} ● {pluralizeMinutes(tracksDuration)}
        </p>
      </div>
      <div className={styles.actions}>
        <PlayButton className={styles.playButton} disabled={isEmpty} onClick={handlePlay} />
        <ActionIcon className={styles.action} disabled={isEmpty} onClick={handleShuffledPlay}>
          <Shuffle size={24} />
        </ActionIcon>
        <Menu>
          <Menu.Target>
            <ActionIcon className={styles.action} onClick={(e) => e.preventDefault()}>
              <EllipsisVertical size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown onClick={(e) => e.preventDefault()}>
            <Menu.Item
              disabled={queue.length === 0 || isEmpty}
              leftSection={<ListStart size={24} />}
              onClick={() => addNext(ids)}
            >
              Играть следующим
            </Menu.Item>
            <Menu.Item
              disabled={queue.length === 0 || isEmpty}
              leftSection={<ListEnd size={24} />}
              onClick={() => addToEnd(ids)}
            >
              Добавить в конец
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Card>
  )
}

export default LikesCard
