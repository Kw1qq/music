import { Loader } from '@mantine/core'

import styles from './loader.module.css'

const LoaderComponent = () => (
  <div className={styles.center}>
    <Loader size={32} />
  </div>
)

export default LoaderComponent
