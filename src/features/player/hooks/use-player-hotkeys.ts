import { useHotkeys } from '@mantine/hooks'

import { usePlayerStore } from '../core/use-player-store'

export const usePlayerHotkeys = () => {
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const rewind = usePlayerStore((state) => state.rewind)
  const forward = usePlayerStore((state) => state.forward)

  useHotkeys(
    [
      ['Space', togglePlay],
      ['ArrowLeft', rewind],
      ['ArrowRight', forward]
    ],
    ['INPUT', 'TEXTAREA']
  )
}
