import { Button } from '@mantine/core'

import { logout } from '@/api/auth/logout'

import styles from './logout-button.module.css'

const LogoutButton = () => (
  <Button classNames={styles} variant='outline' onClick={logout}>
    Выйти
  </Button>
)

export default LogoutButton
