import type { RgbColor } from './types/rgb-color'

export const isDarkColor = (rgb: RgbColor, brightnessLimit: number = 128): boolean => {
  const [r, g, b] = rgb
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < brightnessLimit
}
