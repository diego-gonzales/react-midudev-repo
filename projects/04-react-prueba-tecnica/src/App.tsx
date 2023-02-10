import styles from "./App.module.css";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImageUrl } from "./hooks/useCatImageUrl";

const App = () => {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImageUrl({ fact });

  // Efecto para obtener el 'hecho' al cargar mi componente
  // Este efecto se quitó y se creó un custom hook para esto: 'useCatFact()'

  // Efecto para obtener una imagen cada vez que tenemos un 'hecho' nuevo
  // Este efecto se quitó y se creó un custom hook para esto: 'useCatImagUrl()'

  return (
    <main className={styles.mainContainer}>
      <h1>Cats app</h1>
      <section className={styles.sectionContainer}>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image extracted using the first word for ${fact}`}
          />
        )}
      </section>
      <button onClick={refreshFact}>Get new fact</button>
    </main>
  );
};

export default App;
