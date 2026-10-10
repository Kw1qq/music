import type { ReactNode } from 'react'

import { ActionIcon, Menu as ContextMenu } from '@mantine/core'
import clsx from 'clsx'
import { EllipsisVertical } from 'lucide-react'

import { BASE_URL } from '@/api/constants/base-url'
import { useExpanded } from '@/hooks/use-expanded'
import CreatePlaylistDrawer from '@/shared/create-playlist-drawer'

import { usePlaylistContext } from '../context'
import AddNext from './components/add-next'
import AddToEnd from './components/add-to-end'
import Delete from './components/delete'
import Edit from './components/edit'
import Like from './components/like'

import styles from './menu.module.css'

interface MenuProps {
  actionSize?: number
  children?: ReactNode | ReactNode[]
  className?: string
  onDelete?: () => void
}

const Menu = (props: MenuProps) => {
  const { children, actionSize = 24, className, onDelete } = props

  const { isOwner, isPublic, name, cover, id } = usePlaylistContext()
  const coverUrl = `${BASE_URL}${cover}`
  const { close, open, isExpanded } = useExpanded()

  return (
    <>
      <ContextMenu position='top-end'>
        <ContextMenu.Target>
          <ActionIcon className={clsx(styles.menu, className)} onClick={(e) => e.preventDefault()}>
            <EllipsisVertical size={actionSize} />
          </ActionIcon>
        </ContextMenu.Target>
        <ContextMenu.Dropdown onClick={(e) => e.preventDefault()}>
          {!isOwner && <Like />}
          {isOwner && <Edit onClick={open} />}
          <AddNext />
          <AddToEnd />
          {isOwner && <Delete onDelete={onDelete} />}
          {children}
        </ContextMenu.Dropdown>
      </ContextMenu>
      <CreatePlaylistDrawer
        defaultValues={{
          isPublic,
          name,
          cover: cover ? coverUrl : undefined
        }}
        id={id}
        opened={isExpanded}
        onClose={close}
      />
    </>
  )
}

export default Menu
