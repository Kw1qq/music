import clsx from 'clsx'

type ClassNamesRecord = Record<string, string | undefined>
type ClassNamesFunction<T> = (theme: any, props: any, ctx: any) => T

export function mergeClassNames<T extends ClassNamesRecord>(
  external: ClassNamesFunction<T> | T | undefined,
  overrides: Partial<T>
): ClassNamesFunction<T> | T {
  if (typeof external === 'function') {
    return (theme: any, props: any, ctx: any) => {
      const base = external(theme, props, ctx) || {}
      const result = { ...base } as T
      for (const key of Object.keys(overrides) as (keyof T)[]) {
        result[key] = clsx(overrides[key], result[key]) as T[keyof T]
      }
      return result
    }
  }

  const result = { ...(external || {}) } as T
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    result[key] = clsx(overrides[key], result[key]) as T[keyof T]
  }
  return result
}
