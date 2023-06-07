import useSWR from 'swr';
import { getItemInfo2 } from '../../services/hacker-news';
import { CommentResponse } from '../../types';
import { commentList } from './ListOfComments.css';
import CommentSkeleton from '../CommentSkeleton/CommentSkeleton';
import { getRelativeTime } from '../../utils/getRelativeTime';

interface ListOfComentsProps {
  commentIDs: number[] | undefined;
}

interface CommentProps {
  commentID: number;
}

const Comment = ({ commentID }: CommentProps) => {
  const { data: comment, isLoading } = useSWR(`/comment/${commentID}`, () =>
    getItemInfo2<CommentResponse>(commentID)
  );

  if (isLoading) {
    return <CommentSkeleton />;
  }
  if (!comment) return <span>There is no comment info</span>;

  const { by, time, text, kids } = comment;

  const relativeTime = getRelativeTime(time);

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span> | </span>
            <span>{relativeTime}</span>
          </small>
        </summary>
        <p>{text}</p>
      </details>

      {/* HERE WE APPLY RECURSION */}
      {kids?.length > 0 && <ListOfComents commentIDs={kids.slice(0, 10)} />}
    </>
  );
};

export const ListOfComents = ({ commentIDs }: ListOfComentsProps) => {
  return (
    <ul className={commentList}>
      {commentIDs?.map((commentID) => (
        <li key={commentID}>
          <Comment commentID={commentID} />
        </li>
      ))}
    </ul>
  );
};
