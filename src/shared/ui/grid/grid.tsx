import type { Key, ReactNode } from 'react'

import clsx from 'clsx'

import styles from './grid.module.css'

interface GridProps<T> {
  className?: string
  data: T[]
  getKey: (item: T) => Key
  render: (item: T) => ReactNode
}

const Grid = <T,>(props: GridProps<T>) => {
  const { data, render, className, getKey } = props

  return (
    <div className={styles.container}>
      <ul className={clsx(styles.list, className)}>
        {data.map((item) => (
          <li key={getKey(item)} className={styles.item}>
            {render(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Grid
