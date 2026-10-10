export const formatDateRelativeYear = (dateStr: string, locale: string = 'ru-RU') => {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) {
    return 'Некорректная дата'
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  const year = date.getFullYear()

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  }

  if (year !== currentYear) {
    const formatted = date.toLocaleDateString(locale, options)
    return `${formatted} ${year} года`
  }

  return date.toLocaleDateString(locale, options)
}
