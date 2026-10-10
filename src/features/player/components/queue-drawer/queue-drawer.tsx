import { Drawer } from '@mantine/core'

import QueueList from './components/queue-list'

import styles from './queue-drawer.module.css'

interface QueueDrawerProps {
  opened: boolean
  close: () => void
  overlayClose: () => void
}

const QueueDrawer = (props: QueueDrawerProps) => {
  const { opened, close, overlayClose } = props

  return (
    <Drawer.Root opened={opened} position='right' onClose={close}>
      <Drawer.Overlay />
      <Drawer.Content classNames={{ content: styles.content }}>
        <Drawer.Header className={styles.header}>
          <Drawer.Title>Очередь</Drawer.Title>
          <Drawer.CloseButton className={styles.closeButton} />
        </Drawer.Header>
        <Drawer.Body className={styles.body}>
          {opened && <QueueList close={close} overlayClose={overlayClose} />}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export default QueueDrawer
