import responseMovies from "../mocks/with-results.json";
import whithoutResults from "../mocks/without-results.json";

export function useMovies() {
  const movies = responseMovies.Search;

  return { movies };
}
