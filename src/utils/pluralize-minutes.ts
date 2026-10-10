export const pluralizeMinutes = (count: number): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} минут`
  }
  if (lastDigit === 1) {
    return `${count} минута`
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} минуты`
  }
  return `${count} минут`
}
