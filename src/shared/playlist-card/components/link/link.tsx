import type { ReactNode } from 'react'

import { Link as TanstackLink } from '@tanstack/react-router'
import clsx from 'clsx'

import { usePlaylistContext } from '../context'

import styles from './link.module.css'

interface LinkProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Link = (props: LinkProps) => {
  const { className, children } = props

  const { id } = usePlaylistContext()

  return (
    <TanstackLink className={clsx(styles.link, className)} params={{ id }} to='/library/$id'>
      {children}
    </TanstackLink>
  )
}

export default Link
