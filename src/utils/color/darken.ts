import type { RgbColor } from './types/rgb-color'

export const darken = (rgb: RgbColor, amount: number): RgbColor => {
  const factor = Math.min(1, Math.max(0, amount))
  return rgb.map((c) => Math.round(c * (1 - factor))) as RgbColor
}
