import DataLoader from 'dataloader'

import type { Track } from '@/api/types/track'

import { api } from '@/api/instance'

const trackLoader = new DataLoader<string, Track>(
  async (ids) => {
    const { data } = await api.get<Track[]>('/tracks/batch', {
      params: { ids: ids.join(',') }
    })

    const byId = new Map(data.map((t: Track) => [t.id, t]))
    return ids.map((id) => byId.get(id) ?? new Error(`Трек ${id} не найден`))
  },
  {
    maxBatchSize: 100
  }
)

export const getTrack = (id: string) => trackLoader.load(id)
export const clearTrackCache = (id: string) => trackLoader.clear(id)
