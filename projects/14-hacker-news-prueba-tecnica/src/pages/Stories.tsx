// import { Link } from 'wouter';
// import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { getTopStories } from '../services/hacker-news';
import { Story } from '../components/Story/Story';
import { useEffect, useRef } from 'react';

export default function StoriesPage() {
  // const { data: storyIDs } = useSWR('stories', () => getTopStories(1, 10));

  // size would be the 'page number'
  const { data, isLoading, size, setSize } = useSWRInfinite(
    (index) => `stories/${index + 1}`, // la key que usa para cachear los resultados
    (key) => {
      const [, page] = key.split('/');
      return getTopStories(Number(page), 10);
    }
  );
  const chivatoRef = useRef<HTMLSpanElement>(null);

  // Al usar el useSWRInfinite() ahora la data es un array de arrays, por eso usamos el flat()
  const storyIDs = data?.flat();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading)
          setSize((prevSize) => prevSize + 1);
      },
      { rootMargin: '100px' } // rootMargin sirve para ir cargando nuevos resultados 100 px antes de interceptar el elemento
    );

    if (chivatoRef.current == null) return;

    observer.observe(chivatoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, setSize]);

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {/* {isLoading && <li>loading...</li>} */}
        {storyIDs?.map((storyID, index) => (
          <li key={index}>
            <Story storyID={storyID} storyIndex={index} />
          </li>
        ))}
      </ul>

      <span ref={chivatoRef}></span>

      {/* <button type="button" onClick={() => setSize(size + 1)}>
        Load more
      </button> */}
    </>
  );
}
