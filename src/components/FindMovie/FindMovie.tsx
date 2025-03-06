import React, { useState } from 'react';
import './FindMovie.scss';
import { Movie } from '../../types/Movie';
import classNames from 'classnames';
import { getMovie } from '../../api';
import { MovieCard } from '../MovieCard';

export const FindMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [foundMovies, setFoundMovies] = useState<Movie[]>([]);

  function findMovie(event: React.FormEvent) {
    event.preventDefault();
    getMovie(title).then(movie => {
      if (movie) {
        setFoundMovies(movie);
      }
    });
    console.log(foundMovies);
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
              className="button is-light"
              onClick={() => {}}
              disabled={!title}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            {!!foundMovies.length && (
              <button
                data-cy="addButton"
                type="button"
                className="button is-primary"
              >
                Add to the list
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="container" data-cy="previewContainer">
        <h2 className="title">Preview</h2>
        {foundMovies && <MovieCard movie={foundMovies} />}
      </div>
    </>
  );
};
