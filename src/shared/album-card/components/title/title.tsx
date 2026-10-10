import clsx from 'clsx'

import { useAlbumContext } from '../context'

import styles from './title.module.css'

interface TitleProps {
  className?: string
}

const Title = (props: TitleProps) => {
  const { className } = props

  const { name } = useAlbumContext()

  return <h2 className={clsx(styles.title, className)}>{name}</h2>
}

export default Title
