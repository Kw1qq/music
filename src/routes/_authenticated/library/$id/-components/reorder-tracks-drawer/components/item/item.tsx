import type { ReactNode, RefObject } from 'react'

import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import { PointerActivationConstraints } from '@dnd-kit/dom'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import { PointerSensor } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import clsx from 'clsx'
import { GripVertical } from 'lucide-react'

import type { SortableData } from '@/features/player/components/queue-drawer/components/queue-item/queue-item'

import styles from './item.module.css'

interface ItemProps {
  id: number | string
  index: number
  rootRef: RefObject<HTMLUListElement | null>
  children: (sortableData: SortableData) => ReactNode
}

const Item = (props: ItemProps) => {
  const { children, index, id, rootRef } = props

  const sortableData = useSortable({
    index,
    id,
    modifiers: [RestrictToVerticalAxis, RestrictToElement.configure({ element: rootRef.current })],
    sensors: [
      PointerSensor.configure({
        activationConstraints: [new PointerActivationConstraints.Delay({ value: 0, tolerance: 5 })]
      })
    ]
  })

  return (
    <li
      ref={sortableData.ref}
      className={clsx(styles.item, sortableData.isDragging && styles.active)}
    >
      <button ref={sortableData.handleRef} className={styles.button}>
        <GripVertical size={24} />
      </button>

      {children(sortableData)}
    </li>
  )
}

export default Item
