import { Select } from '@mantine/core'

import { Route } from '@/routes/_authenticated/library/index'

import styles from './filters.module.css'

const Filters = () => {
  const navigate = Route.useNavigate()
  const { filter, sort } = Route.useSearch()

  const onFilter = (value: typeof filter | null) => {
    if (value) {
      navigate({
        to: '.',
        replace: true,
        search: (p) => ({ ...p, filter: value })
      })
    }
  }
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
          { value: 'all', label: 'Все' },
          { value: 'liked', label: 'лайкнутые' },
          { value: 'own', label: 'Собственные' }
        ]}
        value={filter ?? 'all'}
        onChange={onFilter}
      />
      <Select
        data={[
          { value: 'recent', label: 'По дате добавления' },
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
