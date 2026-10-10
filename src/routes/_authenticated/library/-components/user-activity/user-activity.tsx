import LikesCard from '@/shared/likes-card'

import AlbumCard from '../album-card'
import HistoryCard from '../history-card'

import styles from './user-activity.module.css'

const UserActivity = () => (
  <div className={styles.activity}>
    <LikesCard className={styles.likesCard} />
    <AlbumCard />
    <HistoryCard />
  </div>
)

export default UserActivity
