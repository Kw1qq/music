import { Menu } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { Download as DownloadIcon } from 'lucide-react'

import { postImportTrackMutationOptions } from '@/api/tracks/post-import-track/post-import-track-mutation-options'

interface DownloadProps {
  albumId?: string
  url: string
}

const Download = (props: DownloadProps) => {
  const { url, albumId } = props

  const postImportTrackMutation = useMutation(postImportTrackMutationOptions())

  const handleClick = () => {
    postImportTrackMutation.mutate({ url, albumId })
  }

  return (
    <Menu.Item leftSection={<DownloadIcon size={24} />} onClick={handleClick}>
      Скачать
    </Menu.Item>
  )
}

export default Download
