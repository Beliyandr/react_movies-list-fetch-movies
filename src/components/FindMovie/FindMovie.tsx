import React, { useState } from 'react';
import './FindMovie.scss';
import { Movie } from '../../types/Movie';
import classNames from 'classnames';
import { getMovie } from '../../api';
import { MovieCard } from '../MovieCard';
import { MovieData } from '../../types/MovieData';
import imdbLogo from '/images/imdb-logo.jpeg';

type Props = {
  addToFavorite: (movie: Movie) => void;
};

export const FindMovie: React.FC<Props> = ({ addToFavorite }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [foundMovies, setFoundMovies] = useState<MovieData | {}>();
  const [loading, setLoading] = useState(false);

  function findMovie(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    getMovie(title)
      .then(movie => {
        if (movie.Title) {
          const { Title, Plot, Poster, imdbID } = movie;

          const newMovie = {
            title: Title,
            description: Plot,
            imgUrl: Poster || imdbLogo,
            imdbUrl: imdbLogo,
            imdbId: imdbID,
          };

          setFoundMovies(newMovie);
          setErrorMessage('');
        } else {
          setErrorMessage(movie);
        }
      })
      .catch(e => {
        setErrorMessage(e);
        console.log(errorMessage);
      })
      .finally(() => {
        setLoading(false);
        console.log(foundMovies);
      });
  }

  return (
    <>
      <form className="find-movie" onSubmit={findMovie}>
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              data-cy="titleField"
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className={classNames('input', { 'is-danger': errorMessage })}
              onChange={event => setTitle(event.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="help is-danger" data-cy="errorMessage">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              data-cy="searchButton"
              type="submit"
              className={classNames('button is-light', {
                'is-loading': loading,
              })}
              onClick={() => {}}
              disabled={!title}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            {!!foundMovies && (
              <button
                data-cy="addButton"
                type="button"
                className="button is-primary"
                onClick={() => {
                  addToFavorite(foundMovies);
                  setFoundMovies({});
                }}
              >
                Add to the list
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="container" data-cy="previewContainer">
        <h2 className="title">Preview</h2>
        {foundMovies?.title && <MovieCard movie={foundMovies} />}
      </div>
    </>
  );
};
