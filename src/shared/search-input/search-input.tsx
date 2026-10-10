import type { TextInputProps } from '@mantine/core'

import { ActionIcon, TextInput } from '@mantine/core'
import { Search, X } from 'lucide-react'

import { mergeClassNames } from '@/utils/merge-class-names'

import { useSearchInput } from './use-search-input'

import styles from './search-input.module.css'

export interface SearchInputProps extends Omit<TextInputProps, 'onChange' | 'value'> {
  route: string
}

const SearchInput = (props: SearchInputProps) => {
  const { classNames, route, ...restProps } = props

  const [value, onChange, clear] = useSearchInput(route)

  return (
    <TextInput
      {...restProps}
      classNames={mergeClassNames(classNames, {
        input: styles.input,
        section: styles.section
      })}
      rightSection={
        value.length > 0 && (
          <ActionIcon onClick={clear} onMouseDown={(e) => e.preventDefault()}>
            <X size={24} />
          </ActionIcon>
        )
      }
      autoComplete='off'
      leftSection={<Search size={24} />}
      leftSectionPointerEvents='none'
      rightSectionPointerEvents='all'
      type='search'
      value={value}
      onChange={onChange}
    />
  )
}

export default SearchInput
