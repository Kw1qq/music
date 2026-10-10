import type { SearchInputProps as InputProps } from '@/shared/search-input/search-input'

import Input from '@/shared/search-input'

import styles from './search-input.module.css'

interface SearchInputProps extends InputProps {}

const SearchInput = (props: SearchInputProps) => (
  <Input {...props} classNames={{ root: styles.root }} />
)

export default SearchInput
