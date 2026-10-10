import { Button, Notification } from '@mantine/core'
import { useRegisterSW } from 'virtual:pwa-register/react'

import styles from './reload-prompt.module.css'

const intervalMS = 60 * 60 * 1000

const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(_, registration) {
      if (!registration) {
        return
      }
      setInterval(() => {
        registration.update()
      }, intervalMS)
    }
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) {
    return null
  }

  return (
    <Notification
      title={needRefresh ? 'Доступно обновление' : 'Готово к работе офлайн'}
      onClose={close}
    >
      {needRefresh ? (
        <Button className={styles.button} onClick={() => updateServiceWorker(true)}>
          Обновить
        </Button>
      ) : (
        'Приложение закэшировано и будет работать без интернета.'
      )}
    </Notification>
  )
}

export default ReloadPrompt
