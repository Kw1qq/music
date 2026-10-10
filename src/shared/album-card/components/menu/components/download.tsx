import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Download as DownloadIcon } from 'lucide-react'

import { postImportAlbumMutationOptions } from '@/api/albums/post-import-album/post-import-album-mutation-options'

import { useAlbumContext } from '../../context'

const Download = () => {
  const { albumId } = useAlbumContext()
  const postImportAlbumMutation = useMutation(postImportAlbumMutationOptions())

  const downloadPlaylist = () => {
    postImportAlbumMutation.mutate(albumId)
  }

  return (
    <Menu.Item leftSection={<DownloadIcon size={24} />} onClick={downloadPlaylist}>
      Скачать
    </Menu.Item>
  )
}

export default Download
