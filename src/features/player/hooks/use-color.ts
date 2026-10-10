import type { RefObject } from 'react'

import { getColor } from 'colorthief'
import { useEffect, useState } from 'react'

import { clampBrightness } from '@/utils/color/clamp-brightness'
import { darken } from '@/utils/color/darken'
import { isDarkColor } from '@/utils/color/is-dark-color'
import { lighten } from '@/utils/color/lighten'
import { toRgbString } from '@/utils/color/to-rgb-string'

export const useColor = (
  img: RefObject<HTMLImageElement | null>,
  currentTrackId: string | undefined
) => {
  const [color, setColor] = useState<Awaited<ReturnType<typeof getColor>> | null>(null)

  let backgroundColor
  if (color) {
    const clampedRgb = clampBrightness(color.array(), 10, 200)
    const isDark = color ? isDarkColor(clampedRgb, 100) : false
    backgroundColor = toRgbString(isDark ? lighten(clampedRgb, 0.1) : darken(clampedRgb, 0.3))
  }

  useEffect(() => {
    const applyThemeFromImage = async () => {
      if (img.current) {
        const color = await getColor(img.current)
        setColor(color)

        if (color) {
          const clampedRgb = clampBrightness(color.array(), 10, 200)
          const isDark = isDarkColor(clampedRgb, 100)
          const backgroundColor = isDark ? lighten(clampedRgb, 0.1) : darken(clampedRgb, 0.3)

          const isDarkBackground = isDarkColor(backgroundColor, 110)

          document.documentElement.style.setProperty(
            '--player-text-color',
            isDarkBackground ? 'var(--white-color)' : 'var(--black-color)'
          )
          document.documentElement.style.setProperty(
            '--player-text-alt-color',
            isDarkBackground ? 'var(--black-color)' : 'var(--white-color)'
          )
          document.documentElement.style.setProperty(
            '--player-text-secondary-color',
            toRgbString(
              isDarkBackground ? lighten(backgroundColor, 0.4) : darken(backgroundColor, 0.6)
            )
          )

          document.documentElement.style.setProperty(
            '--player-background-color',
            toRgbString(backgroundColor)
          )

          document.documentElement.style.setProperty(
            '--player-background-icon-color',
            toRgbString(
              isDarkBackground ? lighten(backgroundColor, 0.2) : darken(backgroundColor, 0.15)
            )
          )

          document.documentElement.style.setProperty(
            '--player-background-progress-bar-color',
            toRgbString(
              isDarkBackground ? lighten(backgroundColor, 0.15) : darken(backgroundColor, 0.4)
            )
          )
          document.documentElement.style.setProperty(
            '--player-background-progress-bar-range-color',
            toRgbString(
              isDarkBackground ? lighten(backgroundColor, 0.3) : darken(backgroundColor, 0.2)
            )
          )

          document.documentElement.style.setProperty(
            '--player-background-dropdown-color',
            toRgbString(
              isDarkBackground ? darken(backgroundColor, 0.4) : darken(backgroundColor, 0.2)
            )
          )
        }
      }
    }
    if (img.current) {
      img.current.onload = () => {
        applyThemeFromImage()
      }
    }
  }, [currentTrackId])

  return {
    backgroundColor
  }
}
