import type { ComponentProps, ReactNode } from 'react'

import clsx from 'clsx'

import { Context } from './components/context'
import Cover from './components/cover'
import CoverActions from './components/cover-actions'
import Data from './components/data'
import Link from './components/link'
import Menu from './components/menu/menu'
import Title from './components/title'
import TrackCount from './components/track-count'

import styles from './playlist-card.module.css'

interface PlaylistCardProps extends ComponentProps<'div'> {
  children: ReactNode
  className?: string
}

const PlaylistCard = (props: PlaylistCardProps) => {
  const { className, children, ...restProps } = props

  return (
    <div {...restProps} className={clsx(styles.card, className)}>
      {children}
    </div>
  )
}

PlaylistCard.Link = Link
PlaylistCard.Context = Context
PlaylistCard.Cover = Cover
PlaylistCard.CoverActions = CoverActions
PlaylistCard.Data = Data
PlaylistCard.Title = Title
PlaylistCard.TrackCount = TrackCount
PlaylistCard.Menu = Menu

export default PlaylistCard
