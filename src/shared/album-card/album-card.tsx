import type { ReactNode } from 'react'

import clsx from 'clsx'

import Actions from './components/actions'
import Artist from './components/artist'
import { Provider } from './components/context'
import Cover from './components/cover'
import CoverActions from './components/cover-actions'
import Data from './components/data'
import Link from './components/link'
import Menu from './components/menu'
import Title from './components/title'
import Year from './components/year'

import styles from './album-card.module.css'

interface AlbumCardProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const AlbumCard = (props: AlbumCardProps) => {
  const { children, className } = props

  return <div className={clsx(styles.card, className)}>{children}</div>
}
AlbumCard.Cover = Cover
AlbumCard.CoverActions = CoverActions
AlbumCard.Title = Title
AlbumCard.Artist = Artist
AlbumCard.Year = Year
AlbumCard.Provider = Provider
AlbumCard.Data = Data
AlbumCard.Actions = Actions
AlbumCard.Menu = Menu
AlbumCard.Link = Link

export default AlbumCard
