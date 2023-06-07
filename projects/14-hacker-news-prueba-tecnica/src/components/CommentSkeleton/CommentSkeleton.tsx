import ContentLoader from 'react-content-loader';

const CommentSkeleton = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="8" y="3" rx="5" ry="5" width="177" height="13" />
    <rect x="197" y="3" rx="5" ry="5" width="73" height="13" />
    <rect x="9" y="33" rx="5" ry="5" width="311" height="93" />
  </ContentLoader>
);

export default CommentSkeleton;
