import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';
import { Movie } from './types/Movie';
import React from 'react';
import { getMovie } from './api';
import { MovieData } from './types/MovieData';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  function getMoviesFromServer(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    e.preventDefault();
    getMovie(query).then(film => {
      if (film.Error) {
        setErrorMsg(true);
      } else {
        // setMovie(film as Movie);
      }
    });
  }
  console.log(movie);

  return (
    <div className="page">
      <div className="page-content">{/* <MoviesList movies={movies} /> */}</div>

      <div className="sidebar">
        {/* <FindMovie
          setQuery={setQuery}
          query={query}
          getMoviesFromServer={getMoviesFromServer}
          movie={movie}
        /> */}
      </div>
    </div>
  );
};
