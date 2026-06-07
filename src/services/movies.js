const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export const searchMovies = async ({ search }) => {
  if (!API_KEY) {
    throw new Error('Missing OMDb API key. Add VITE_OMDB_API_KEY to your environment variables.')
  }

  if (search.trim() === '') return []

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}`
    )

    if (!response.ok) {
      throw new Error('Network error while searching movies')
    }

    const json = await response.json()

    if (json.Response === 'False') return []

    return json.Search?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster !== 'N/A' ? movie.Poster : null,
      type: movie.Type
    })) ?? []
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
