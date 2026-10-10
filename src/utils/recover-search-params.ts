import { redirect } from '@tanstack/react-router'

import { useSearchStore } from '@/stores/use-search-store'

export const recoverSearchParams = <T extends object>(routeId: string, search: T) => {
  const save = useSearchStore.getState().getQ<T>(routeId)

  if (Object.entries(search).length === 0 && Object.entries(save).length > 0) {
    throw redirect({
      to: '.',
      search: (p) => ({ ...p, ...save }),
      replace: true
    })
  }
}
