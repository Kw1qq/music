import type { LinkProps } from '@tanstack/react-router'
import type { ComponentProps, MouseEvent } from 'react'

import { Link, useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { Fragment, useRef } from 'react'

import type { Artists } from '@/api/types/artists'

import styles from './artists-list.module.css'

export interface ArtistsListProps {
  artists: Artists
  classNames?: {
    root?: string
    artist?: string
  }
  isLink?: boolean
  linkProps?: LinkProps & ComponentProps<'a'>
  onNavigate?: () => void
  open: () => void
}

const ArtistsList = (props: ArtistsListProps) => {
  const { classNames, artists, isLink = true, linkProps, open, onNavigate } = props

  const wrapperRef = useRef<HTMLSpanElement>(null)

  const navigate = useNavigate()

  const handleClick = (artistId: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      wrapperRef?.current &&
      artists.length > 1 &&
      wrapperRef.current.clientHeight < wrapperRef.current.scrollHeight
    ) {
      e.preventDefault()
      open()
      return
    }

    if (onNavigate) {
      e.preventDefault()
      onNavigate()

      setTimeout(() => {
        navigate({
          to: '/artist/$id',
          params: { id: artistId }
        })
      }, 100)
    }
  }

  return (
    <span ref={wrapperRef} className={clsx(styles.artists, classNames?.root)}>
      {artists.map(({ artistId, name }, index) => (
        <Fragment key={name}>
          {artistId && isLink ? (
            <Link
              {...linkProps}
              className={clsx(styles.artist, styles.link, classNames?.artist)}
              params={{ id: artistId }}
              to='/artist/$id'
              onClick={handleClick(artistId)}
            >
              {name}
            </Link>
          ) : (
            <p className={clsx(styles.artist, classNames?.artist)}>{name}</p>
          )}
          {index < artists.length - 1 && ', '}
        </Fragment>
      ))}
    </span>
  )
}

export default ArtistsList
