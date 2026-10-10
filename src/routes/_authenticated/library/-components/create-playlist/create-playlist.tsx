import { ActionIcon } from '@mantine/core'
import { Plus } from 'lucide-react'

import { useExpanded } from '@/hooks/use-expanded'
import CreatePlaylistDrawer from '@/shared/create-playlist-drawer'

import styles from './create-playlist.module.css'

const CreatePlaylist = () => {
  const { isExpanded, close, open } = useExpanded()

  return (
    <>
      <ActionIcon className={styles.action} onClick={open}>
        <Plus size={24} />
      </ActionIcon>
      <CreatePlaylistDrawer opened={isExpanded} onClose={close} />
    </>
  )
}

export default CreatePlaylist
