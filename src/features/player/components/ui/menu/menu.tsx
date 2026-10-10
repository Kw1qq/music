import type { ActionIconProps } from '@mantine/core'

import { ActionIcon, Menu as ContextMenu } from '@mantine/core'
import { EllipsisVertical } from 'lucide-react'

import TrackCard from '@/shared/track-card'
import { mergeClassNames } from '@/utils/merge-class-names'

import styles from './menu.module.css'

interface MenuProps {
  classNames?: ActionIconProps['classNames']
}

const Menu = (props: MenuProps) => {
  const { classNames } = props

  return (
    <ContextMenu position='top-end'>
      <ContextMenu.Target>
        <ActionIcon classNames={mergeClassNames(classNames, { root: styles.root })}>
          <EllipsisVertical size={18} />
        </ActionIcon>
      </ContextMenu.Target>
      <ContextMenu.Dropdown>
        <TrackCard.Menu.Like />
        <TrackCard.Menu.AddToPlaylist />
        <TrackCard.Menu.AddNext />
        <TrackCard.Menu.AddToEnd />
        <TrackCard.Menu.Delete />
      </ContextMenu.Dropdown>
    </ContextMenu>
  )
}

export default Menu
