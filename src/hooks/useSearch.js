import { useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const trimmedSearch = search.trim()

  const error = trimmedSearch !== '' && trimmedSearch.length < 3
    ? 'Introduce al menos 3 caracteres para buscar una película'
    : ''

  return { search, updateSearch, error }
}