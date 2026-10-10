import { Chip } from '@mantine/core'

import { Route } from '../..'

import styles from './filtres.module.css'

const Filters = () => {
  const { type } = Route.useSearch()
  const navigate = Route.useNavigate()

  const onChange = (value: typeof type) => {
    navigate({
      to: '.',
      replace: true,
      search: (p) => ({ ...p, type: value })
    })
  }

  return (
    <Chip.Group value={type ?? 'track'} onChange={onChange}>
      <div className={styles.wrapper}>
        <Chip value='track'>Треки</Chip>
        <Chip value='artist'>Исполнители</Chip>
        <Chip value='album'>Альбомы</Chip>
      </div>
    </Chip.Group>
  )
}

export default Filters
