import styles from './scroll-plain.module.css'

interface PlainProps {
  plain: string
}

const ScrollPlain = (props: PlainProps) => {
  const { plain } = props

  return <div className={styles.plain}>{plain}</div>
}

export default ScrollPlain
