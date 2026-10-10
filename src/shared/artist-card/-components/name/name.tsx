import clsx from 'clsx'

import { useArtistContext } from '../../artist-card'

import styles from './name.module.css'

interface NameProps {
  className?: string
}

const Name = (props: NameProps) => {
  const { className } = props

  const { name } = useArtistContext()

  return <h2 className={clsx(styles.name, className)}>{name}</h2>
}

export default Name
