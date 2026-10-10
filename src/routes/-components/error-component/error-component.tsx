import { Button } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'

import { useSearchStore } from '@/stores/use-search-store'

import styles from './error-component.module.css'

interface ErrorComponentProps {
  routeId: string
}

const ErrorComponent = (props: ErrorComponentProps) => {
  const { routeId } = props

  const navigate = useNavigate()
  const setQ = useSearchStore((state) => state.setQ)

  const handleClick = () => {
    setQ(routeId, {})
    navigate({
      to: '.',
      search: undefined
    })
  }

  return (
    <div className={styles.wrapper}>
      <span>Что-то пошло не так</span>
      <Button onClick={handleClick}>попробывать еще раз</Button>
    </div>
  )
}

export default ErrorComponent
