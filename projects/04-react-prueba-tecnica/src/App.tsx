import { useState, useEffect } from "react";
import { CatFactsResponse } from "./models/cat-facts.interface";
import { CatsImageResponse } from "./models/cats-image.interface";
import styles from "./App.module.css";

const CAT_ENDPOINT_RANDOM_FACT: string = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE_URL: string = `https://cataas.com/cat/says/${"firstWord"}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

const App = () => {
  const [fact, setFact] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data: CatFactsResponse) => {
        const { fact } = data;
        setFact(fact);

        const firstWord = fact.split(" ")[0];

        fetch(
          `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
        )
          .then((resp) => resp.json())
          .then((data: CatsImageResponse) => {
            setImageUrl(data.url);
          });
      });
  }, []);

  return (
    <main className={styles.mainContainer}>
      <h1>Cats app</h1>
      <section className={styles.sectionContainer}>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}/${imageUrl}`}
            alt={`Image extracted using the first word for ${fact}`}
          />
        )}
      </section>
    </main>
  );
};

export default App;
