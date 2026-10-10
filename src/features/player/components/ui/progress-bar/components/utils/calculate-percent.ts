export const calculatePercent = (clientX: number, el: HTMLElement | null) => {
  if (!el) {
    return 0
  }

  const rect = el.getBoundingClientRect()
  const x = clientX - rect.left
  return Math.min(100, Math.max(0, (x / rect.width) * 100))
}
