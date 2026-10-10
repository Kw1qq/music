const MEDIA_CACHE_NAME = 'media-cache'

export async function cacheTrackForOffline(url: string) {
  if (!('caches' in window)) {
    return
  }

  try {
    const cache = await caches.open(MEDIA_CACHE_NAME)

    const alreadyCached = await cache.match(url)
    if (alreadyCached) return

    const response = await fetch(url)
    if (response.ok && response.status === 200) {
      await cache.put(url, response)
    }
  } catch (e) {
    console.error(e)
  }
}
