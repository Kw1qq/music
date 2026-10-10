import type { MouseEvent, ReactNode } from 'react'

import { Link, useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { createContext, use } from 'react'

import type { ArtistSummary } from '@/api/types/artist-summary'

import Avatar from './-components/avatar'
import Name from './-components/name'
import Wrapper from './-components/wrapper'

import styles from './artist-card.module.css'

const Context = createContext<ArtistSummary | null>(null)

interface ArtistCardProps {
  artist: ArtistSummary
  children: ReactNode | ReactNode[]
  classname?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const ArtistCard = (props: ArtistCardProps) => {
  const { children, classname, artist, onClick } = props

  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = artist.artistId
    if (onClick && id) {
      e.preventDefault()
      onClick(e)
      setTimeout(() => {
        navigate({
          to: '/artist/$id',
          params: { id }
        })
      }, 100)
    }
  }

  return (
    <Context value={artist}>
      {artist.artistId ? (
        <Link
          className={clsx(styles.card, classname)}
          params={{ id: artist.artistId }}
          to='/artist/$id'
          onClick={handleClick}
        >
          {children}
        </Link>
      ) : (
        <div className={clsx(styles.card, classname)}>{children}</div>
      )}
    </Context>
  )
}

ArtistCard.Avatar = Avatar
ArtistCard.Name = Name
ArtistCard.Wrapper = Wrapper

export const useArtistContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('context not found')
  }

  return context
}

export default ArtistCard
