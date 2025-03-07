import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  function addToFavorite(movie: Movie) {
    setMovies(prevMovies => {
      if (!prevMovies.find(item => item.imdbId === movie.imdbId)) {
        return [...prevMovies, movie];
      }
      return [...prevMovies];
    });
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <FindMovie addToFavorite={addToFavorite} />
      </div>
    </div>
  );
};
