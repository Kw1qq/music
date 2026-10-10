import { Select } from '@mantine/core'

import { Route } from '../../index'

import styles from './sorts.module.css'

const Sorts = () => {
  const navigate = Route.useNavigate()
  const { sort } = Route.useSearch()

  const handleChange = (value: typeof sort | null) => {
    if (value) {
      navigate({
        to: '.',
        replace: true,
        search: (p) => ({ ...p, sort: value })
      })
    }
  }

  return (
    <Select
      data={[
        { value: 'recent', label: 'По дате добавления' },
        { value: 'title', label: 'По названию' },
        { value: 'artist', label: 'По исполнителю' }
      ]}
      className={styles.root}
      value={sort ?? 'recent'}
      onChange={handleChange}
    />
  )
}

export default Sorts
