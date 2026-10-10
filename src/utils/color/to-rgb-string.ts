import type { RgbColor } from './types/rgb-color'

export const toRgbString = (rgb: RgbColor): string => {
  const [r, g, b] = rgb
  return `rgb(${r}, ${g}, ${b})`
}
