import Card from '@/shared/ui/card'

import styles from './album-card.module.css'

const AlbumCard = () => (
  <Card className={styles.card} to='/album'>
    <Card.Title className={styles.title}>Альбомы</Card.Title>
    <Card.Subtitle className={styles.subTitle}>Все сохранённые альбомы</Card.Subtitle>
  </Card>
)

export default AlbumCard
