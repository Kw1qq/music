import type { LinkComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

import Data from './components/data'
import Subtitle from './components/subtitle'
import Title from './components/title'

import styles from './card.module.css'

interface CardProps extends LinkComponentProps {
  children: ReactNode
  className?: string
}

const Card = (props: CardProps) => {
  const { children, className, ...restProps } = props

  return (
    <Link {...restProps} className={clsx(styles.card, className)}>
      {children}
    </Link>
  )
}

Card.Title = Title
Card.Data = Data
Card.Subtitle = Subtitle

export default Card
