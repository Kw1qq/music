import { Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import styles from './empty.module.css'

const Empty = () => (
  <div className={styles.empty}>
    <span>Здесь ничего нет</span>
    <span>{'ฅ^•ﻌ•^ฅ'}</span>
    <Button component={Link} to='/'>
      На главную
    </Button>
  </div>
)

export default Empty
