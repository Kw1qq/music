import clsx from 'clsx'

type ClassNamesRecord = Record<string, string | undefined>

export function mergeClassNamesObject<T extends ClassNamesRecord>(
  external: T | undefined,
  overrides: Partial<T>
): T {
  const result = { ...(external || {}) } as T
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    result[key] = clsx(overrides[key], result[key]) as T[keyof T]
  }
  return result
}
