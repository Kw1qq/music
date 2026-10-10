import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client'

import { del, get, set } from 'idb-keyval'

const IDB_KEY = 'music-query-cache'

export function createIDBPersister(idbKey: string = IDB_KEY): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbKey, client)
    },
    restoreClient: async () => get<PersistedClient>(idbKey),
    removeClient: async () => {
      await del(idbKey)
    }
  }
}
