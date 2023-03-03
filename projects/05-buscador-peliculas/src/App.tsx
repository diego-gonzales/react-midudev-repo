import "./App.css";
import Movies from "./components/Movies/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";
/*
  useRef() te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente. Útil para guardar cualquier valor que puedas mutar: un identificador, un elemento del DOM, un contador, etc. Cada vez que cambia no vuelve a renderizar el componente (esto lo diferencia del useState())
*/
import { useRef, useState, useCallback } from "react";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [sort, setSort] = useState(false);
  const { inputError, controlValue, setControlValue } = useSearch();
  const { movies, getMovies, isLoading, error } = useMovies({
    keyword: controlValue,
    sort
  });
  // const inputRef = useRef<HTMLInputElement>(null);

  /*
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;

  }; */

  /*
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = Object.fromEntries(
      new window.FormData(event.currentTarget)
    );
    console.log(fields);
  }; */

  const debounceGetMovies = useCallback(
    debounce((inputValue: string) => {
      console.log("searching...");
      getMovies(inputValue);
    }, 500),
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMovies(controlValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.startsWith(" ")) return;
    setControlValue(inputValue);
    const abc = debounce(() => inputValue);
    debounceGetMovies(inputValue);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Movie searcher</h1>
        <form className="form" onSubmit={handleSubmit}>
          {/* <input
            ref={inputRef}
            type="text"
            placeholder="Avengers, Fast and furious, etc."
          /> */}
          {/* <input
            name="movieTitle"
            type="text"
            placeholder="Avengers, Fast and furious, etc."
          /> */}
          <input
            onChange={handleChange}
            value={controlValue}
            name="movieTitle"
            type="text"
            placeholder="Avengers, Fast and furious, etc."
          />
          <input type="checkbox" checked={sort} onChange={handleSort} />
          <button type="submit">Search</button>
        </form>
        {inputError && <p style={{ color: "red" }}>{inputError}</p>}
      </header>

      <main>{isLoading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
