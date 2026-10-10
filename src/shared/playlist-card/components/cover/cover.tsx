import clsx from 'clsx'

import { BASE_URL } from '@/api/constants/base-url'
import { getSignedMediaUrl } from '@/utils/get-signed-media-url'

import { usePlaylistContext } from '../context'

import styles from './cover.module.css'

interface CoverProps {
  className?: string
}

const Cover = (props: CoverProps) => {
  const { className } = props

  const { cover } = usePlaylistContext()

  const coverUrl = getSignedMediaUrl(`${BASE_URL}${cover}`)

  return (
    <img
      alt='Обложка'
      className={clsx(styles.cover, className)}
      height={260}
      src={coverUrl}
      width={260}
    />
  )
}

export default Cover
