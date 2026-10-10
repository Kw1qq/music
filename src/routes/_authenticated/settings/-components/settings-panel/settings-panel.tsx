import CacheSwitch from '../cache-switch'
import LogoutButton from '../logout-button.tsx'
import ThemeSwitch from '../theme-switch'

import styles from './settings-panel.module.css'

const SettingsPanel = () => (
  <div className={styles.panel}>
    <h2 className={styles.title}>Настройки</h2>
    <ThemeSwitch />
    <CacheSwitch />
    <LogoutButton />
  </div>
)

export default SettingsPanel
