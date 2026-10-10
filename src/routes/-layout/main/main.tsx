import type { ReactElement } from 'react'

import styles from './main.module.css'

interface MainProps {
  children: ReactElement | ReactElement[]
}

const Main = (props: MainProps) => {
  const { children } = props

  return <main className={styles.main}>{children}</main>
}

export default Main
