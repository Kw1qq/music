import { Select } from '@mantine/core'

import { Route } from '@/routes/_authenticated/library/$id'

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
        { value: 'default', label: 'По умолчанию' },
        { value: 'title', label: 'По названию' },
        { value: 'artist', label: 'По исполнителю' }
      ]}
      className={styles.root}
      value={sort ?? 'default'}
      onChange={handleChange}
    />
  )
}

export default Sorts
