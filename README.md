# React Movie Search

Movie search application built with React and Vite, using the OMDb API to fetch movie data.
This project focuses on applying modern React fundamentals, custom hooks, API integration, controlled forms, debounced search and clean UI states.

## Live Demo

Coming soon.

## Features

* Search movies by title using the OMDb API.
* Automatic search while typing with debounce.
* Avoids duplicated consecutive searches.
* Sort movies alphabetically.
* Responsive movie grid.
* Loading state with skeleton placeholders.
* Empty state before searching.
* No results state when the API does not return matches.
* Error handling for invalid searches or API issues.
* Environment variable support for the API key.
* Clean separation between UI, hooks and services.

## Tech Stack

* React
* JavaScript
* Vite
* CSS
* OMDb API
* just-debounce-it

## React concepts practiced

This project was built as a practical exercise to reinforce several key React concepts:

* `useState` for local UI state.
* `useRef` to persist the previous search value without triggering re-renders.
* `useMemo` to memoize sorted movie results.
* `useCallback` to keep function references stable.
* Custom hooks to separate logic from UI.
* Controlled input handling.
* Debounced API calls to reduce unnecessary requests.
* Service layer to isolate API contract mapping.

## Project structure

src/
├── components/
│   ├── Movies.jsx
│   └── ...
├── hooks/
│   ├── useMovies.js
│   └── useSearch.js
├── services/
│   └── movies.js
├── App.jsx
├── main.jsx
└── App.css


## Environment variables

This project uses the OMDb API. You need an API key to run it locally.

Create a `.env` file in the root directory:

env
VITE_OMDB_API_KEY=your_api_key_here


An example file is provided:

txt
.env.example


## Installation

Clone the repository:

git clone https://github.com/your-username/react-movie-search.git


Go to the project folder:

cd react-movie-search


Install dependencies:

npm install


Run the development server:

npm run dev


Build for production:

npm run build


## API contract mapping

The OMDb API returns movie data using fields such as `Title`, `Year`, `imdbID` and `Poster`.

Instead of using the API response directly inside components, the data is mapped in the service layer:

{
  id: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  poster: movie.Poster
}

This keeps the application components independent from the external API contract and improves maintainability.

## What I learned

* How to structure a React application using custom hooks.
* How to separate API logic from UI components.
* How to avoid unnecessary API calls using debounce.
* How to handle loading, error and empty states.
* How to use memoization with `useMemo` and `useCallback`.
* How to manage environment variables in a Vite project.
* How to prepare a small React project for deployment and portfolio use.
