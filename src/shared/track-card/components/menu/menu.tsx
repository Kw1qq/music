import type { ReactNode } from 'react'

import { ActionIcon, Menu as ContextMenu } from '@mantine/core'
import { EllipsisVertical } from 'lucide-react'

import AddNext from './components/add-next'
import AddToEnd from './components/add-to-end'
import AddToPlaylist from './components/add-to-playlist'
import Delete from './components/delete'
import Download from './components/download'
import GoToArtists from './components/go-to-artists'
import Like from './components/like'

import styles from './menu.module.css'

interface MenuProps {
  actionSize?: number
  children: ReactNode | ReactNode[]
}

const Menu = (props: MenuProps) => {
  const { children, actionSize = 24 } = props

  return (
    <ContextMenu position='top-end'>
      <ContextMenu.Target>
        <ActionIcon classNames={{ root: styles.root }}>
          <EllipsisVertical size={actionSize} />
        </ActionIcon>
      </ContextMenu.Target>
      <ContextMenu.Dropdown>{children}</ContextMenu.Dropdown>
    </ContextMenu>
  )
}

Menu.Like = Like
Menu.AddNext = AddNext
Menu.AddToEnd = AddToEnd
Menu.AddToPlaylist = AddToPlaylist
Menu.Delete = Delete
Menu.GoToArtists = GoToArtists
Menu.Download = Download

export default Menu
