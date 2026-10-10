import type { MenuItemProps } from '@mantine/core'
import type { ComponentProps, MouseEvent } from 'react'

import { Menu } from '@mantine/core'
import { createLink, useNavigate } from '@tanstack/react-router'
import { MicVocal } from 'lucide-react'
import { use } from 'react'

import type { Artists } from '@/api/types/artists'

import { Context, useArtistsDrawerContext } from '../../context'

interface GoToArtistsProps {
  artists?: Artists
  onClick?: () => void
}

const MenuItem = (props: MenuItemProps & ComponentProps<'button'>) => (
  <Menu.Item {...props} leftSection={<MicVocal size={24} />}>
    Перейти к исполнителю
  </Menu.Item>
)

export const MenuItemLink = createLink(MenuItem)

const GoToArtists = (props: GoToArtistsProps) => {
  const { artists, onClick } = props

  let artistsList = artists
  if (artistsList === undefined) {
    const context = use(Context)
    if (!context) {
      throw new Error('the context was not found')
    }
    artistsList = context.artists
  }

  const { open } = useArtistsDrawerContext()

  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick()
      e.preventDefault()

      const artistId = artistsList[0].artistId
      if (artistId) {
        setTimeout(() => {
          navigate({
            to: '/artist/$id',
            params: { id: artistId }
          })
        }, 100)
      }
    }
  }

  return artistsList.length > 1 ? (
    <Menu.Item leftSection={<MicVocal size={24} />} onClick={open}>
      Перейти к исполнителям
    </Menu.Item>
  ) : (
    <MenuItemLink
      disabled={!artistsList[0].artistId}
      params={{ id: artistsList[0].artistId! }}
      to='/artist/$id'
      onClick={handleClick}
    />
  )
}

export default GoToArtists
