import { Button } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { getTracksQueryOptions } from '@/api/tracks/get-tracks/get-tracks-query-options'
import { usePlayerStore } from '@/features/player/core/use-player-store'

export const Route = createFileRoute('/_authenticated/')({ component: Home })

function Home() {
  const getTracksQuery = useQuery(getTracksQueryOptions())

  const playQueue = usePlayerStore((state) => state.playQueue)

  return (
    <div>
      <Button
        onClick={() => {
          if (getTracksQuery.data) {
            playQueue(
              getTracksQuery.data.map((t) => t.id),
              0
            )
          }
        }}
      >
        test
      </Button>
    </div>
  )
}
