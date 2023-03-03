import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { searchMovies } from "../services/movies.service";
interface Props {
  keyword: string;
  sort: boolean;
}

/* Es mala práctica usarlo así ya que si usamos nuestro custom hook en varios lugares estariamos compartiendo dicha variables lo cual no es recomendable, y haría que nuestro hook no sea reutilizable */
// let previousSearch = '';

export function useMovies({ keyword, sort }: Props) {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const previousSearch = useRef(keyword);

  const getMovies = useCallback(async (keywordToSearch: string) => {
    if (keywordToSearch === previousSearch.current) return;

    try {
      setIsLoading(true);
      setError(null);
      previousSearch.current = keywordToSearch;
      // previousSearch = keywordToSearch;
      const moviesResult = await searchMovies(keywordToSearch);
      setMovies(moviesResult);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    console.log("useMemo");
    return sort
      ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, isLoading, error, sort };
}
