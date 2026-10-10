export const pluralizeTracks = (count: number): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} треков`
  }

  if (lastDigit === 1) {
    return `${count} трек`
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} трека`
  }

  return `${count} треков`
}
