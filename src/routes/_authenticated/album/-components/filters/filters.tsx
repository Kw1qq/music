import { Select } from '@mantine/core'

import { Route } from '@/routes/_authenticated/album/index'

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
          { value: 'recent', label: 'По дате добавления' },
          { value: 'release', label: 'По дате релиза' },
          { value: 'title', label: 'По названию' },
          {
            group: 'По количеству треков',
            items: [
              { value: 'ascending', label: 'По возрастанию' },
              { value: 'descending', label: 'По убыванию' }
            ]
          }
        ]}
        value={sort ?? 'recent'}
        onChange={onSort}
      />
    </div>
  )
}

export default Filters
