let counter = 0
export const generateId = (): string => {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  counter += 1
  return `q-${Date.now()}-${counter}`
}
