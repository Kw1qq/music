import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'

import { usePlayerStore } from '@/features/player/core/use-player-store'
import VirtualizeScrollList from '@/shared/virtualize-scroll-list'
import { useDragStore } from '@/stores/use-drag-store'

import QueueItem from '../queue-item'
import Track from '../track'

// import styles from './queue-list.module.css'

interface QueueListProps {
  close: () => void
  overlayClose: () => void
}

const QueueList = (props: QueueListProps) => {
  const { close, overlayClose } = props

  const queue = usePlayerStore((state) => state.queue)
  const reorderQueue = usePlayerStore((state) => state.reorderQueue)
  const setDragging = useDragStore((state) => state.setDragging)

  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex) ?? 0

  return (
    <DragDropProvider
      onDragEnd={() => {
        setDragging(false)
      }}
      onDragOver={(event) => {
        const queueItemIds = queue.map((item) => item.queueItemId)
        const newQueueItemIds = move(queueItemIds, event)
        const newQueue = newQueueItemIds.map((id) => queue.find((item) => item.queueItemId === id)!)
        reorderQueue(newQueue)
      }}
      onDragStart={() => setDragging(true)}
    >
      <VirtualizeScrollList
        render={(virtualItem) => {
          const queueItemId = queue[virtualItem.index].queueItemId
          const trackId = queue[virtualItem.index].trackId

          return (
            <QueueItem key={queueItemId} id={queueItemId} index={virtualItem.index}>
              <Track
                close={close}
                index={virtualItem.index}
                overlayClose={overlayClose}
                queueItemId={queueItemId}
                trackId={trackId}
              />
            </QueueItem>
          )
        }}
        count={queue.length}
        estimateSize={() => 80}
        initialOffset={() => currentTrackIndex * 80 + 5 * currentTrackIndex}
        overscan={5}
      />
    </DragDropProvider>
  )
}

export default QueueList
