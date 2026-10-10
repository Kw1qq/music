import { useSuspenseQuery } from '@tanstack/react-query'

import { getMeQueryOptions } from '@/api/auth/get-me/get-me-query-options'

import styles from './setting-header.module.css'

const SettingsHeader = () => {
  const getMeQuery = useSuspenseQuery(getMeQueryOptions())

  const { avatarUrl, email, name } = getMeQuery.data

  return (
    <div className={styles.header}>
      <img alt='Аватарка' className={styles.image} height={120} src={avatarUrl} width={120} />
      <div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  )
}

export default SettingsHeader
