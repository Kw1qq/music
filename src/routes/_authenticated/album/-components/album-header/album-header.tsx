import Background from '@/routes/-components/background'

import styles from './album-header.module.css'

const AlbumHeader = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>Альбомы</h1>
    <Background className={styles.background} />
  </div>
)

export default AlbumHeader
