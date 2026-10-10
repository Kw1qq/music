import clsx from 'clsx'

import { useArtistContext } from '../../artist-card'

import styles from './avatar.module.css'

interface AvatarProps {
  classname?: string
}

const Avatar = (props: AvatarProps) => {
  const { classname } = props

  const { thumbnail } = useArtistContext()

  return (
    <img
      alt='Аватарка'
      className={clsx(styles.avatar, classname)}
      height={70}
      src={thumbnail!}
      width={70}
    />
  )
}
export default Avatar
