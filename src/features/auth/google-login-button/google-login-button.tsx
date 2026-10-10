import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'

import { signInWithGoogle } from '@/api/auth/sign-in-with-google'

import styles from './google-login-button.module.css'

const GoogleLoginButton = () => {
  const navigate = useNavigate()

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className={styles.wrapper}>
        <GoogleLogin
          onError={() => console.error('Login failed')}
          onSuccess={async (response) => {
            await signInWithGoogle(response.credential)
            navigate({
              to: '/'
            })
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
