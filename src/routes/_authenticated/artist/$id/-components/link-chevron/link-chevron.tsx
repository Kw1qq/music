import type { LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

import styles from './link-chevron.module.css'

interface LinkChevronProps extends LinkProps {
  children: ReactNode
}

const LinkChevron = (props: LinkChevronProps) => {
  const { children, ...restProps } = props

  return (
    <Link {...restProps} className={styles.link}>
      <p className={styles.title}>{children}</p>
      <ChevronRight size={18} />
    </Link>
  )
}

export default LinkChevron
