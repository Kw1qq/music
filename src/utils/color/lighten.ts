import type { RgbColor } from './types/rgb-color'

export const lighten = (rgb: RgbColor, amount: number): RgbColor => {
  const factor = Math.min(1, Math.max(0, amount))
  const maxVal = Math.max(...rgb) > 1 ? 255 : 1
  return rgb.map((c) => Math.round(c + (maxVal - c) * factor)) as RgbColor
}
