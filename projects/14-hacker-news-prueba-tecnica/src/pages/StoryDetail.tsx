import useSWR from 'swr';
import { getItemInfo2 } from '../services/hacker-news';
import { ListOfComents } from '../components/ListOfComents/ListOfComents';
import { StoryResponse } from '../types';
import { useEffect } from 'react';

// This props are passed thanks to Wouter
interface Props {
  params: {
    id: string;
  };
}

export default function StoryDetailPage({ params: { id } }: Props) {
  const { data: story, isLoading } = useSWR(`/story/${id}`, () =>
    getItemInfo2<StoryResponse>(Number(id))
  );

  const { kids, title } = story ?? {};

  useEffect(() => {
    document.title = `Hacker News - ${title}`;
  }, [title]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ListOfComents commentIDs={kids?.slice(0, 10)} />
      )}
    </div>
  );
}
