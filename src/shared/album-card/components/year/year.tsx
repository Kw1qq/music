import clsx from 'clsx'

import { useAlbumContext } from '../context'

import styles from './year.module.css'

interface YearProps {
  className?: string
}

const Year = (props: YearProps) => {
  const { className } = props

  const { year } = useAlbumContext()

  return <p className={clsx(styles.year, className)}>{year}</p>
}

export default Year
