import ContentLoader from 'react-content-loader';

const StorySkeleton = () => (
  <ContentLoader
    speed={2}
    width={880}
    height={50}
    viewBox="0 0 880 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="10" cy="19" r="8" />
    <rect x="25" y="12" rx="5" ry="5" width="384" height="13" />
    <rect x="27" y="38" rx="5" ry="5" width="67" height="9" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
    <rect x="421" y="12" rx="5" ry="5" width="182" height="13" />
    <rect x="102" y="38" rx="5" ry="5" width="67" height="9" />
    <rect x="177" y="38" rx="5" ry="5" width="67" height="9" />
    <rect x="251" y="38" rx="5" ry="5" width="67" height="9" />
  </ContentLoader>
);

export default StorySkeleton;
