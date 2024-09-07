import React from 'react';
import './FindMovie.scss';
import classNames from 'classnames';
import { MovieData } from '../../types/MovieData';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

type FindMovieProps = {
  query: string;
  setQuery: (value: string) => void;
  movie: Movie;
  getMoviesFromServer: (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => void;
};

export const FindMovie: React.FC<FindMovieProps> = ({
  query,
  setQuery,
  movie,
  getMoviesFromServer = () => {},
}) => {
  return (
    <>
      <form
        className="find-movie"
        onClick={e => {
          getMoviesFromServer(e);
        }}
      >
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
              className="input is-danger"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <p className="help is-danger" data-cy="errorMessage">
            Can&apos;t find a movie with such a title
          </p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              data-cy="searchButton"
              type="submit"
              className={classNames('button is-light', {
                // 'is-loading': !query,  /////////////// todo
              })}
              disabled={query ? false : true}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            <button
              data-cy="addButton"
              type="button"
              className="button is-primary"
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      <div className="container" data-cy="previewContainer">
        <h2 className="title">Preview</h2>
        {movie && <MovieCard movie={movie} />}
      </div>
    </>
  );
};
