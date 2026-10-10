import type { ReactNode } from 'react'

import { ActionIcon, Menu as ContextMenu } from '@mantine/core'
import clsx from 'clsx'
import { EllipsisVertical } from 'lucide-react'

import AddNext from './components/add-next'
import AddToEnd from './components/add-to-end'
import Delete from './components/delete'
import Download from './components/download'
import Like from './components/like'

import styles from './menu.module.css'

interface MenuProps {
  actionSize?: number
  children?: ReactNode | ReactNode[]
  className?: string
}

const Menu = (props: MenuProps) => {
  const { children, actionSize = 24, className } = props

  return (
    <>
      <ContextMenu position='top-end'>
        <ContextMenu.Target>
          <ActionIcon className={clsx(styles.menu, className)} onClick={(e) => e.preventDefault()}>
            <EllipsisVertical size={actionSize} />
          </ActionIcon>
        </ContextMenu.Target>
        <ContextMenu.Dropdown onClick={(e) => e.preventDefault()}>{children}</ContextMenu.Dropdown>
      </ContextMenu>
    </>
  )
}

Menu.Delete = Delete
Menu.Download = Download
Menu.Like = Like
Menu.AddNext = AddNext
Menu.AddToEnd = AddToEnd

export default Menu
