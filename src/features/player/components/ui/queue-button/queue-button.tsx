import { ActionIcon } from '@mantine/core'
import { ListMusic } from 'lucide-react'

import styles from './queue-button.module.css'

interface QueueButtonProps {
  onClick: () => void
}

const QueueButton = (props: QueueButtonProps) => {
  const { onClick } = props

  return (
    <ActionIcon classNames={{ root: styles.root }} onClick={onClick}>
      <ListMusic />
    </ActionIcon>
  )
}

export default QueueButton
