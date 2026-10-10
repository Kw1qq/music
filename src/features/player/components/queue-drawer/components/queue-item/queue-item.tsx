import type { ReactNode } from 'react'

import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import { PointerActivationConstraints } from '@dnd-kit/dom'
import { PointerSensor } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import clsx from 'clsx'
import { GripVertical } from 'lucide-react'
import { memo, useState } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './queue-item.module.css'

export type SortableData = ReturnType<typeof useSortable>

interface ItemProps {
  children: ReactNode
  id: number | string
  index: number
}

const QueueItem = (props: ItemProps) => {
  const { children, index, id } = props

  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex)
  const isCurrentTrack = currentTrackIndex === index

  const [element, setElement] = useState<Element | null>(null)
  const sortableData = useSortable({
    index,
    id,
    element,
    modifiers: [RestrictToVerticalAxis],
    sensors: [
      PointerSensor.configure({
        activationConstraints: [new PointerActivationConstraints.Delay({ value: 0, tolerance: 5 })]
      })
    ]
  })

  return (
    <li
      ref={setElement}
      className={clsx(
        styles.item,
        sortableData.isDragging && styles.active,
        isCurrentTrack && styles.active
      )}
    >
      <button ref={sortableData.handleRef} className={styles.button}>
        <GripVertical size={24} />
      </button>

      {children}
    </li>
  )
}

export default memo(QueueItem)
