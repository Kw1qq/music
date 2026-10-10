import { Select } from '@mantine/core'

import { Route } from '../..'

import styles from './filters.module.css'

const Filters = () => {
  const navigate = Route.useNavigate()
  const { sort } = Route.useSearch()

  const onSort = (value: typeof sort | null) => {
    if (value) {
      navigate({
        to: '.',
        replace: true,
        search: (p) => ({ ...p, sort: value })
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <Select
        data={[
          { value: 'default', label: 'По умолчанию' },
          { value: 'release', label: 'По дате релиза' },
          { value: 'title', label: 'По названию' }
        ]}
        value={sort ?? 'default'}
        onChange={onSort}
      />
    </div>
  )
}

export default Filters
