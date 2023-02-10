import { CatFactsResponse } from '../models/cat-facts.interface';
const CAT_ENDPOINT_RANDOM_FACT: string = "https://catfact.ninja/fact";

export const getRandomFact = async () => {
  const resp = await fetch(CAT_ENDPOINT_RANDOM_FACT);
  const { fact }: CatFactsResponse = await resp.json();
  return fact;

  // return fetch(CAT_ENDPOINT_RANDOM_FACT)
  //   .then((resp) => {
  //     if (!resp.ok) throw new Error('Error fetching fact');
  //     return resp.json()
  //   })
  //   .then((data: CatFactsResponse) => {
  //     const { fact } = data;
  //     return fact;
  //   })
  //   /* NOTA: el catch en el FetchApi entra solamente si ha habido un problema con la 'request', no con la 'response'.
  //     Por ejemplo Axios si captura todos los errores en el catch.
  //   */
  //   .catch(err => {
  //     // tanto si hay un error con la respuesta
  //     // como si hay un error con la petición
  //     console.log(err);
  //   })
}