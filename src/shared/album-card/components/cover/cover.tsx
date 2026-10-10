import clsx from 'clsx'

import { useAlbumContext } from '../context'

import styles from './cover.module.css'

interface CoverProps {
  className?: string
}

const Cover = (props: CoverProps) => {
  const { className } = props

  const { cover } = useAlbumContext()

  return (
    <img
      alt='Обложка'
      className={clsx(styles.cover, className)}
      height={300}
      src={cover!}
      width={300}
    />
  )
}

export default Cover
