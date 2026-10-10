import type { ReactVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import type { ReactNode } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'

import styles from './virtualize-list.module.css'

export interface VirtualizeListProps {
  count: number
  gap?: number
  listClassName?: string
  overscan?: number
  scrollMargin?: number
  viewportRef: HTMLDivElement | null
  estimateSize: (index: number) => number
  initialOffset?: () => number
  render: (
    virtualItem: VirtualItem,
    virtualizer: ReactVirtualizer<HTMLDivElement, Element>
  ) => ReactNode
}

const VirtualizeList = (props: VirtualizeListProps) => {
  const {
    count,
    estimateSize,
    overscan = 2,
    gap = 5,
    listClassName,
    render,
    viewportRef,
    scrollMargin,
    initialOffset
  } = props

  const virtualizer = useVirtualizer({
    count,
    estimateSize,
    getScrollElement: () => viewportRef,
    gap,
    overscan,
    measureElement: (el) => el.getBoundingClientRect().height,
    scrollMargin,
    initialOffset
  })

  return (
    <div
      ref={virtualizer.containerRef}
      style={{
        height: `${virtualizer.getTotalSize()}px`
      }}
      className={styles.wrapper}
    >
      <ul
        style={{
          transform: `translateY(${virtualizer.getVirtualItems()[0]?.start}px)`
        }}
        className={clsx(styles.list, listClassName)}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => render(virtualItem, virtualizer))}
      </ul>
    </div>
  )
}

export default VirtualizeList
