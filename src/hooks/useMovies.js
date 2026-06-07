import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const previousSearch = useRef('')

  const getMovies = useCallback(async ({ search }) => {
    const normalizedSearch = search.trim()

    if (normalizedSearch === previousSearch.current) return

    if (normalizedSearch.length < 3) {
      previousSearch.current = normalizedSearch
      setMovies([])
      setHasSearched(false)
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = normalizedSearch
      const newMovies = await searchMovies({ search: normalizedSearch })
      setMovies(newMovies)
      setHasSearched(true)
    } catch (e) {
      setMovies([])
      setHasSearched(true)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, error, loading, hasSearched }
}
