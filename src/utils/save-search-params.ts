import { useSearchStore } from '@/stores/use-search-store'

export const saveSearchParams = <T extends Record<string, unknown>>(routeId: string, search: T) => {
  useSearchStore.getState().setQ<T>(routeId, search)
}
