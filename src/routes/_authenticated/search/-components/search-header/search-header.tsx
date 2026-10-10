import type { ReactNode } from 'react'

import styles from './search-header.module.css'

interface HeaderProps {
  children: ReactNode | ReactNode[]
}

const SearchHeader = (props: HeaderProps) => {
  const { children } = props

  return <div className={styles.header}>{children}</div>
}

export default SearchHeader
