import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export const useCatFact = () => {
  const [fact, setFact] = useState<string>("");

  const refreshFact = () => {
    getRandomFact().then(setFact);
  };

  useEffect(refreshFact, []);

  return { fact, refreshFact };
};

// NOTA: evitar en lo posible que un custom hook devuelva la actualización del state, en este caso por ejemplo 'setState', mejor se creó un método que haga eso 'refreshFact()' y ese es el que se expone.