import { useEffect, useState } from 'react'

import type { LyricLine } from '@/utils/parse-lyrics'

import { usePlayerStore } from '@/features/player/core/use-player-store'

export const useSyncedLyrics = (lines: LyricLine[]) => {
  const howl = usePlayerStore((state) => state.howl)

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!howl) {
      return
    }

    let raf: number

    const tick = () => {
      const progress = howl.seek()

      setActiveIndex(lines.reduce((acc, line, idx) => (line.time <= progress ? idx : acc), -1))

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [howl, lines])

  return activeIndex
}
