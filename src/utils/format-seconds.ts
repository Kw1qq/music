export const formatSeconds = (seconds: number) => {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '0:00'
  }

  const totalSeconds = Math.floor(Math.max(0, seconds))

  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  const paddedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${minutes}:${paddedSeconds}`
}
