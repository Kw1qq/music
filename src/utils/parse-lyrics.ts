export interface LyricLine {
  text: string
  time: number
}

export function parseSyncedLyrics(synced: string): LyricLine[] {
  const lines = synced.split('\n').filter((line) => line.trim())
  const result: LyricLine[] = []
  const regex = /^\[(\d{2}):(\d{2})\.(\d{2})\]\s*(.*)$/

  for (const raw of lines) {
    const match = raw.match(regex)
    if (match) {
      const minutes = parseInt(match[1], 10)
      const seconds = parseInt(match[2], 10)
      const centiseconds = parseInt(match[3], 10)
      let time = minutes * 60 + seconds + centiseconds / 100
      time = Math.max(0, time)
      result.push({ time, text: match[4] })
    }
  }
  return result
}
