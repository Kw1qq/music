import GoogleLoginButton from '@/features/auth/google-login-button'

import styles from './login-section.module.css'

const LoginSection = () => (
  <div className={styles.section}>
    <h1 className={styles.title}>Войдите с Google</h1>
    <GoogleLoginButton />
  </div>
)

export default LoginSection
