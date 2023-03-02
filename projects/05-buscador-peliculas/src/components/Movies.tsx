import { Movie } from "../interfaces/movies.interface";

interface MoviesProps {
  movies: Movie[];
}

const Movies = ({ movies }: MoviesProps) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No movies found for this search.</p>
  );
};

export default Movies;
