import { ActionIcon, Button, Menu } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { EllipsisVertical, ListEnd, ListStart, Play, Shuffle } from 'lucide-react'

import { getLikedTracksQueryOptions } from '@/api/tracks/get-liked-tracks/get-liked-tracks-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'
import Background from '@/routes/-components/background'
import { pluralizeMinutes } from '@/utils/pluralize-minutes'
import { pluralizeTracks } from '@/utils/pluralize-track'

import styles from './likes-header.module.css'

const LikesHeader = () => {
  const getLikedTracksQuery = useSuspenseQuery(getLikedTracksQueryOptions())
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playShuffled = usePlayerStore((state) => state.playShuffled)
  const addNext = usePlayerStore((state) => state.addNext)
  const addToEnd = usePlayerStore((state) => state.addToEnd)
  const queue = usePlayerStore((state) => state.queue)

  const tracksCound = getLikedTracksQuery.data.length
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
    <div className={styles.header}>
      <Background />
      <div>
        <h1 className={styles.title}>Любимое</h1>
        <p className={styles.info}>
          {pluralizeTracks(tracksCound)} ● {pluralizeMinutes(tracksDuration)}
        </p>
      </div>
      <div className={styles.actions}>
        <Button disabled={isEmpty} rightSection={<Play size={18} />} onClick={handlePlay}>
          воспроизвести
        </Button>
        <ActionIcon disabled={isEmpty} onClick={handleShuffledPlay}>
          <Shuffle />
        </ActionIcon>
        <Menu>
          <Menu.Target>
            <ActionIcon className={styles.action} onClick={(e) => e.preventDefault()}>
              <EllipsisVertical size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown onClick={(e) => e.preventDefault()}>
            <Menu.Item
              disabled={queue.length === 0 && isEmpty}
              leftSection={<ListStart size={24} />}
              onClick={() => addNext(ids)}
            >
              Играть следующим
            </Menu.Item>
            <Menu.Item
              disabled={queue.length === 0 && isEmpty}
              leftSection={<ListEnd size={24} />}
              onClick={() => addToEnd(ids)}
            >
              Добавить в конец
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  )
}

export default LikesHeader
