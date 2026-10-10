import { ScrollArea } from '@mantine/core'
import clsx from 'clsx'
import { useState } from 'react'

import type { VirtualizeListProps } from '../virtualize-list/virtualize-list'

import VirtualizeList from '../virtualize-list'

import styles from './virtualize-scroll-list.module.css'

interface VirtualizeScrollListProps extends Omit<VirtualizeListProps, 'viewportRef'> {
  className?: string
}

const VirtualizeScrollList = (props: VirtualizeScrollListProps) => {
  const { className, ...restProps } = props

  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)

  return (
    <ScrollArea
      className={clsx(styles.parent, className)}
      offsetScrollbars='y'
      scrollbarSize={8}
      viewportRef={setScrollElement}
    >
      <VirtualizeList {...restProps} viewportRef={scrollElement} />
    </ScrollArea>
  )
}

export default VirtualizeScrollList
