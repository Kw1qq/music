import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { useSearchStore } from '@/stores/use-search-store'

type OnChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void
type clearType = () => void

export const useSearchInput = (route: string): [string, OnChangeType, clearType] => {
  const search = useSearch({ strict: false })
  const [value, setValue] = useState<string>(() => search.s ?? '')
  const setQ = useSearchStore((state) => state.setQ)

  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    navigate({
      to: '.',
      replace: true,
      search: (prev) => ({
        ...prev,
        s: value || undefined
      })
    })
  }

  const onChange: OnChangeType = (e) => {
    const { target } = e

    handleSearch(target.value)
    setValue(target.value)
  }

  const clear = () => {
    setValue('')
    setQ(route, { s: undefined })
    navigate({
      to: '.',
      replace: true,
      search: (prev) => ({
        ...prev,
        s: undefined
      })
    })
  }

  return [value, onChange, clear]
}
