import {
  ActionIcon,
  Combobox,
  ScrollArea,
  TextInput,
  UnstyledButton,
  useCombobox
} from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RotateCcwClock, Search, X } from 'lucide-react'
import { useRef, useState } from 'react'

import { deleteHistoryFromSearchMutationOption } from '@/api/youtube/delete-history-from-search/delete-history-from-search-mutation-options'
import { getHistoryFromSearchQueryOptions } from '@/api/youtube/get-history-from-search/get-history-from-search-query-options'
import { useSearchStore } from '@/stores/use-search-store'

import { Route } from '../..'

import styles from './search-input.module.css'

const SearchInput = () => {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const queryClient = useQueryClient()
  const getHistoryFromSearchQuery = useQuery({ ...getHistoryFromSearchQueryOptions() })
  const deleteHistoryFromSearchMutation = useMutation(deleteHistoryFromSearchMutationOption())
  const [value, setValue] = useState<string>(() => search.s ?? '')
  const setQ = useSearchStore((state) => state.setQ)
  const inputRef = useRef<HTMLInputElement>(null)

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
    }
  })

  const submit = (value: string) => {
    navigate({
      to: '.',
      replace: true,
      search: () => ({ type: undefined, s: value })
    })
    inputRef.current?.blur()
    combobox.closeDropdown()
    queryClient.invalidateQueries(getHistoryFromSearchQueryOptions())
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit(value)
  }

  const clear = () => {
    inputRef.current?.focus()
    setValue('')
    setQ(Route.id, { s: undefined })
    navigate({
      to: '.',
      replace: true,
      search: () => ({
        type: undefined,
        s: undefined
      })
    })
  }

  const options = getHistoryFromSearchQuery.data
    ?.filter(({ query }) => query.toLowerCase().includes(value.toLowerCase().trim()))
    ?.map((item) => (
      <Combobox.Option key={item.id} className={styles.option} value={item.query}>
        <div className={styles.group}>
          <RotateCcwClock size={18} />
          <span className={styles.title}>{item.query}</span>
        </div>
        <ActionIcon
          onClick={(e) => {
            e.stopPropagation()
            deleteHistoryFromSearchMutation.mutate(item.id)
          }}
        >
          <X size={18} />
        </ActionIcon>
      </Combobox.Option>
    ))

  const isEmpty = getHistoryFromSearchQuery.data?.length === 0 || options?.length === 0

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setValue(val)
          submit(val)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target>
          <TextInput
            ref={inputRef}
            leftSection={
              <ActionIcon type='submit'>
                <Search size={24} />
              </ActionIcon>
            }
            rightSection={
              value && (
                <ActionIcon
                  onClick={clear}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <X size={24} />
                </ActionIcon>
              )
            }
            classNames={styles}
            leftSectionPointerEvents='all'
            placeholder='Трек, исполнитель, альбом'
            rightSectionPointerEvents='all'
            value={value}
            onBlur={() => combobox.closeDropdown()}
            onChange={(value) => setValue(value.currentTarget.value)}
            onFocus={() => combobox.openDropdown()}
          />
        </Combobox.Target>
        <Combobox.Dropdown hidden={isEmpty}>
          <Combobox.Header className={styles.header}>
            <span>История поиска</span>
            <UnstyledButton
              className={styles.button}
              onClick={() => deleteHistoryFromSearchMutation.mutate(undefined)}
            >
              Очистить
            </UnstyledButton>
          </Combobox.Header>
          <ScrollArea.Autosize mah={200} offsetScrollbars='present' scrollbarSize={8} type='always'>
            <Combobox.Options>{options}</Combobox.Options>
          </ScrollArea.Autosize>
        </Combobox.Dropdown>
      </Combobox>
    </form>
  )
}

export default SearchInput
