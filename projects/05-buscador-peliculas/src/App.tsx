import "./App.css";
import Movies from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
/*
  useRef() te permite crear una referencia mutable que persiste durante todo el cicli de vida de tu componente. Útil para guardar cualquier valor que puedas mutar: un identificador, un elemento del DOM, un contador, etc. Cada vez que cambia no vuelve a renderizar el componente (esto lo diferencia del useState())
*/
import { useRef } from "react";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { movies } = useMovies();
  const { error, controlValue, setControlValue } = useSearch();
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ controlValue });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.startsWith(" ")) return;
    setControlValue(inputValue);
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
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
