import { MovieData } from './types/MovieData';
import { ResponseError } from './types/ReponseError';
<<<<<<< HEAD
const API_KEY = 'ed57ff6b';
=======

const API_KEY = 'e9fe8744';
>>>>>>> a710d3c7a42aa1076069438bb6a8efb29484a846
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export function getMovie(query: string): Promise<MovieData | ResponseError> {
  return fetch(`${API_URL}&t=${query}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
