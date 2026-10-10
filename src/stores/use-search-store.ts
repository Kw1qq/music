import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUseSearchStore {
  searches: Record<string, Record<string, unknown>>
  getQ: <T>(route: string) => T
  setQ: <T extends Record<string, unknown>>(route: string, params: T) => void
}

export const useSearchStore = create<IUseSearchStore>()(
  persist(
    (set, get) => ({
      searches: {},
      getQ: <T>(route: string): T => (get().searches[route] || {}) as T,
      setQ: <T extends Record<string, unknown>>(route: string, params: T) => {
        const routeSearches = get().getQ<T>(route)

        const newSearches: Record<string, unknown> = { ...routeSearches }

        Object.entries(params).forEach(([key, value]) => {
          if (value === undefined) {
            delete newSearches[key]
          } else {
            newSearches[key] = value
          }
        })

        set((state) => ({
          searches: {
            ...state.searches,
            [route]: newSearches
          }
        }))
      }
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
