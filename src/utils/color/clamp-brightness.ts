import type { RgbColor } from './types/rgb-color'

export const clampBrightness = (
  rgb: RgbColor,
  minBrightness = 60,
  maxBrightness = 200
): RgbColor => {
  // Проверка, что rgb — массив из 3 чисел
  if (!Array.isArray(rgb) || rgb.length < 3) {
    return [128, 128, 128] // безопасный серый
  }

  let [r, g, b] = rgb

  // Проверка на NaN и undefined
  if (![r, g, b].every((v) => typeof v === 'number' && !Number.isNaN(v) && v >= 0 && v <= 255)) {
    return [128, 128, 128]
  }

  const avg = (r + g + b) / 3

  // Если все каналы равны 0, просто задаём минимальную яркость
  if (avg === 0) {
    return [minBrightness, minBrightness, minBrightness]
  }

  if (avg < minBrightness) {
    const factor = minBrightness / avg
    r = Math.min(255, Math.round(r * factor))
    g = Math.min(255, Math.round(g * factor))
    b = Math.min(255, Math.round(b * factor))
  } else if (avg > maxBrightness) {
    const factor = maxBrightness / avg
    r = Math.min(255, Math.round(r * factor))
    g = Math.min(255, Math.round(g * factor))
    b = Math.min(255, Math.round(b * factor))
  }

  return [r, g, b]
}
