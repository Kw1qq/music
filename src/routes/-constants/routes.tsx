import type { LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { ListVideo, Music, Search, Settings } from 'lucide-react'

export type RoutesProps = LinkProps & {
  title: string
  icon: ReactNode
}

export const routes: RoutesProps[] = [
  {
    title: 'Главная',
    to: '/',
    icon: <Music size={32} />
  },
  {
    title: 'Поиск',
    to: '/search',
    icon: <Search size={32} />
  },
  {
    title: 'Библиотека',
    to: '/library',
    icon: <ListVideo size={32} />
  },
  {
    title: 'Настройки',
    to: '/settings',
    icon: <Settings size={32} />
  }
]
