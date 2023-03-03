const API_KEY='a8ea6de6';

export const searchMovies = async (keyword: string) => {
  if (keyword === '') return null;

  try {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
    const data = await resp.json();
    return data.Search;
  } catch (error) {
    throw new Error('Error searching movies')
  }
}