import type { ReactNode } from 'react'

import styles from './library-header.module.css'

interface FlexProps {
  children: ReactNode[]
}

const LibraryHeader = (props: FlexProps) => {
  const { children } = props

  return <div className={styles.header}>{children}</div>
}

export default LibraryHeader
