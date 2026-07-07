import { ref } from 'vue'

/**
 * useFetch(url)
 * -------------
 * Small reusable composable for reading remote/local JSON resources.
 * Works for:
 *  - local static files served from /public (e.g. '/data/gallery.json')
 *  - remote HTTP(S) endpoints (e.g. 'https://api.example.com/items')
 *
 * Returns reactive refs: { data, error, loading, load }
 * `load()` is exposed separately so views can trigger/re-trigger the fetch
 * (e.g. on mount, or when the user clicks "Retry").
 */
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function load(overrideUrl) {
    const target = overrideUrl || url
    loading.value = true
    error.value = null
    try {
      const response = await fetch(target)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message || 'Unknown error fetching data'
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, load }
}
