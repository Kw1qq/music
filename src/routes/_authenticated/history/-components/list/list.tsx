import { DatePickerInput } from '@mantine/dates'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarDays } from 'lucide-react'
import { useMemo } from 'react'

import { getHistoryQueryOptions } from '@/api/tracks/get-history/get-history-query-options'
import Empty from '@/routes/-components/empty'
import { useContainerContext } from '@/routes/-layout/content/content'
import VirtualizeList from '@/shared/virtualize-list'
import { searchTracksByName } from '@/utils/search-tracks-by-name'

import { Route } from '../..'
import Track from '../track'
import { filterTracksByDateRange } from './utils/filter-tracks-by-date-range'
import { formatDateRelativeYear } from './utils/format-date-relative-year'
import { groupTracksByDate } from './utils/group-tracks-by-date'

import styles from './list.module.css'

import 'dayjs/locale/ru'

const List = () => {
  const { s, date } = Route.useSearch()
  const navigate = Route.useNavigate()

  const getHistoryQuery = useSuspenseQuery(getHistoryQueryOptions())

  const tracks = getHistoryQuery.data
  const filteredTracks = filterTracksByDateRange(searchTracksByName(tracks, s), date)
  const groupTracks = groupTracksByDate(filteredTracks)
  const allDates = groupTracksByDate(tracks).map(({ date }) => date)

  const flatItems = useMemo(() => {
    const items: Array<{ type: 'header'; date: string } | { type: 'track'; trackId: string }> = []
    groupTracks.forEach((group) => {
      items.push({ type: 'header', date: group.date })
      group.tracks.forEach((track) => {
        items.push({ type: 'track', trackId: track.id })
      })
    })
    return items
  }, [groupTracks])

  const onChangePickerInput = (date: string | null) => {
    navigate({ to: '.', replace: true, search: (p) => ({ ...p, date }) })
  }

  const viewportRef = useContainerContext()

  if (tracks.length === 0) {
    return <Empty />
  }

  return (
    <div className={styles.wrapper}>
      <DatePickerInput
        clearable
        excludeDate={(date) => !allDates.includes(date)}
        leftSection={<CalendarDays size={18} />}
        leftSectionPointerEvents='none'
        locale='ru'
        placeholder='выберите дату'
        value={date}
        onChange={onChangePickerInput}
      />
      <div>
        <VirtualizeList
          estimateSize={(index) => {
            const item = flatItems[index]
            return item.type === 'header' ? 31 : 80
          }}
          render={(virtualItem, virtualizer) => {
            const item = flatItems[virtualItem.index]
            if (!item) return null

            if (item.type === 'header') {
              return (
                <div
                  key={item.date}
                  ref={virtualizer.measureElement}
                  className={styles.group}
                  data-index={virtualItem.index}
                >
                  <h2 className={styles.date}>{formatDateRelativeYear(item.date)}</h2>
                </div>
              )
            }

            return (
              <li
                key={item.trackId}
                ref={virtualizer.measureElement}
                className={styles.item}
                data-index={virtualItem.index}
              >
                <Track trackId={item.trackId} />
              </li>
            )
          }}
          count={flatItems.length}
          gap={10}
          listClassName={styles.list}
          overscan={4}
          viewportRef={viewportRef}
        />
      </div>
    </div>
  )
}

export default List
