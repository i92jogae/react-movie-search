const POSTER_FALLBACK = 'https://placehold.co/300x450/111827/e5e7eb?text=No+Poster'

function MovieCard ({ movie }) {
  return (
    <li className='movie-card'>
      <div className='movie-card__poster-wrapper'>
        <img
          className='movie-card__poster'
          src={movie.poster ?? POSTER_FALLBACK}
          alt={movie.poster ? `${movie.title} poster` : `Poster not available for ${movie.title}`}
          loading='lazy'
        />
      </div>
      <div className='movie-card__content'>
        <h3>{movie.title}</h3>
        <div className='movie-card__metadata'>
          <span>{movie.year}</span>
          {movie.type && <span>{movie.type}</span>}
        </div>
      </div>
    </li>
  )
}

function MovieSkeletons () {
  return (
    <ul className='movies movies--skeleton' aria-label='Loading movies'>
      {Array.from({ length: 6 }).map((_, index) => (
        <li className='movie-card movie-card--skeleton' key={index}>
          <div className='skeleton skeleton--poster' />
          <div className='skeleton skeleton--title' />
          <div className='skeleton skeleton--text' />
        </li>
      ))}
    </ul>
  )
}

function EmptyState ({ hasSearched, search }) {
  return (
    <section className='empty-state'>
      <span className='empty-state__icon' aria-hidden='true'>🎬</span>
      <h2>{hasSearched ? 'No movies found' : 'Start searching'}</h2>
      <p>
        {hasSearched
          ? `We could not find results for "${search.trim()}". Try another movie title.`
          : 'Type at least 3 characters to discover movies from the OMDb database.'}
      </p>
    </section>
  )
}

export function Movies ({ movies, loading, hasSearched, search }) {
  if (loading) return <MovieSkeletons />

  if (movies.length === 0) {
    return <EmptyState hasSearched={hasSearched} search={search} />
  }

  return (
    <ul className='movies'>
      {movies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  )
}
