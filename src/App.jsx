import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'just-debounce-it'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    const trimmedSearch = search.trim()

    if (isFirstInput.current) {
      isFirstInput.current = trimmedSearch === ''
      return
    }

    if (trimmedSearch === '') {
      setError('')
      return
    }

    if (trimmedSearch.length < 3) {
      setError('Introduce al menos 3 caracteres para buscar una película')
      return
    }

    setError('')
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error: searchError } = useSearch()
  const {
    movies,
    loading,
    error: moviesError,
    getMovies,
    hasSearched
  } = useMovies({ sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 350),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(previousSort => !previousSort)
  }

  const handleClearSearch = () => {
    updateSearch('')
    getMovies({ search: '' })
  }

  const displayedError = searchError || moviesError

  return (
    <div className='app-shell'>
      <header className='hero'>
        <span className='hero__eyebrow'>React + OMDb API</span>
        <h1>Movie Search</h1>
        <p className='hero__description'>
          Search movies, avoid repeated requests and sort results with a small React app built using custom hooks and debounce.
        </p>

        <form className='search-form' onSubmit={handleSubmit}>
          <label className='search-form__field'>
            <span className='visually-hidden'>Movie title</span>
            <input
              value={search}
              onChange={handleChange}
              type='search'
              placeholder='Search for Avengers, Batman, Matrix...'
              autoComplete='off'
            />
          </label>

          <button className='button button--primary' type='submit'>
            Search
          </button>

          {search && (
            <button className='button button--ghost' type='button' onClick={handleClearSearch}>
              Clear
            </button>
          )}
        </form>

        <div className='toolbar'>
          <label className='sort-control'>
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <span>Sort alphabetically</span>
          </label>

          {movies.length > 0 && (
            <p className='results-count'>
              {movies.length} {movies.length === 1 ? 'result' : 'results'}
            </p>
          )}
        </div>

        {displayedError && <p className='message message--error'>{displayedError}</p>}
      </header>

      <main className='content' aria-live='polite'>
        <Movies
          movies={movies}
          loading={loading}
          hasSearched={hasSearched}
          search={search}
        />
      </main>

      <footer className='footer'>
        Built with React, custom hooks, debounce and OMDb API.
      </footer>
    </div>
  )
}

export default App
