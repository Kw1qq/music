import styles from './plain.module.css'

interface PlainProps {
  plain: string
}

const Plain = (props: PlainProps) => {
  const { plain } = props

  return (
    <div className={styles.plain}>
      <div className={styles.text}>{plain}</div>
      <p className={styles.showMore}>Показать еще</p>
    </div>
  )
}

export default Plain
