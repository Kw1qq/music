import { Switch, useMantineColorScheme } from '@mantine/core'
import { Moon, Sun } from 'lucide-react'

import styles from './theme-switch.module.css'

const ThemeSwitch = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true })

  return (
    <Switch
      checked={colorScheme === 'dark'}
      classNames={styles}
      label='Темная тема'
      labelPosition='left'
      offLabel={<Sun size={16} />}
      size='md'
      onChange={(e) => setColorScheme(e.currentTarget.checked ? 'dark' : 'light')}
      onLabel={<Moon size={16} />}
    />
  )
}

export default ThemeSwitch
