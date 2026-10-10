import type { ReactNode } from 'react'

import { ScrollArea } from '@mantine/core'
import clsx from 'clsx'
import { createContext, use, useState } from 'react'

import { usePlayerStore } from '@/features/player/core/use-player-store'

import styles from './content.module.css'

interface ContentProps {
  children: ReactNode
}

const Context = createContext<HTMLDivElement | null>(null)

const Content = (props: ContentProps) => {
  const { children } = props
  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)

  return (
    <ScrollArea
      classNames={{
        root: styles.root,
        content: clsx(styles.content, !!currentTrackId && styles.bar)
      }}

      scrollbars='y'
      viewportProps={{ id: 'main-content' }}
      viewportRef={setScrollElement}
    >
      <Context value={scrollElement}>{children}</Context>
    </ScrollArea>
  )
}

export default Content

export const useContainerContext = () => {
  const context = use(Context)

  return context
}
