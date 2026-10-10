import type { AxiosRequestConfig } from 'axios'

import type { PlaylistDetail } from '@/api/types/playlist-detail'

import { api } from '@/api/instance'

export type postCreatePlaylistArg = Pick<PlaylistDetail, 'name'> & {
  cover?: File
  isPublic?: boolean
}

export const postCreatePlaylist = async (
  playlist: postCreatePlaylistArg,
  config?: AxiosRequestConfig
) => {
  const formData = new FormData()
  formData.append('name', playlist.name)
  if (playlist.cover) {
    formData.append('cover', playlist.cover)
  }
  if (playlist.isPublic !== undefined) {
    formData.append('isPublic', String(playlist.isPublic))
  }

  const { data } = await api.post('/playlists', formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}
