import useSWR from 'swr';
import { getItemInfo2 } from '../../services/hacker-news';
import { Link } from 'wouter';
import {
  myStory,
  storyTitle,
  storyHeader,
  storyFooter,
  storyLink,
} from './Story.css';
import StorySkeleton from '../StorySkeleton/StorySkeleton';
import { StoryResponse } from '../../types';
import { getRelativeTime } from '../../utils/getRelativeTime';

interface Props {
  storyID: number;
  storyIndex: number;
}

export const Story = ({ storyID, storyIndex }: Props) => {
  const { data: story, isLoading } = useSWR(`/story/${storyID}`, () =>
    getItemInfo2<StoryResponse>(storyID)
  );

  if (isLoading) return <StorySkeleton />;
  if (!story) return <span>There is no story info</span>;

  const { by, kids, score, title, url, time } = story;

  let domain = '';

  try {
    if (url) domain = new URL(url).hostname.replace('www.', '');
  } catch (error) {
    console.log(error);
  }

  const relativeTime = getRelativeTime(time);

  return (
    <article className={myStory}>
      <header className={storyHeader}>
        <small>{storyIndex + 1} .</small>
        <a
          className={storyTitle}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <a
          className={storyLink}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          ({domain})
        </a>
      </header>

      <footer className={storyFooter}>
        <span>{score} points</span>
        <Link className={storyLink} href={`/article/${storyID}`}>
          by {by}
        </Link>
        <Link className={storyLink} href={`/article/${storyID}`}>
          {relativeTime}
        </Link>
        <Link className={storyLink} href={`/article/${storyID}`}>
          {kids?.length ?? 0} coments
        </Link>
      </footer>
    </article>
  );
};
