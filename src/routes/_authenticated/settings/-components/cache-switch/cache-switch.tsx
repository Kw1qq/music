import { Switch } from '@mantine/core'

import { usePlayerStore } from '@/features/player/core/use-player-store'

const CacheSwitch = () => {
  const shouldCacheTrack = usePlayerStore((state) => state.shouldCacheTrack)
  const setShouldCacheTrack = usePlayerStore((state) => state.setShouldCacheTrack)

  return (
    <Switch
      checked={shouldCacheTrack}
      label='Кешировать треки'
      labelPosition='left'
      size='md'
      onChange={(e) => setShouldCacheTrack(e.currentTarget.checked)}
    />
  )
}

export default CacheSwitch
