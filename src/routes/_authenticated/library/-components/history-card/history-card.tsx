import { History } from 'lucide-react'

import Card from '@/shared/ui/card'

import styles from './history-card.module.css'

const HistoryCard = () => (
  <Card className={styles.card} to='/history'>
    <Card.Data>
      <Card.Title>История</Card.Title>
      <History size={24} />
    </Card.Data>
    <Card.Subtitle>Вся ваша музыкальная история в одном месте</Card.Subtitle>
  </Card>
)

export default HistoryCard
