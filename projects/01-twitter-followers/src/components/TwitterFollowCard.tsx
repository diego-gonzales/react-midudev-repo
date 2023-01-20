import "./TwitterFollowCard.css";
import { useState } from "react";
import { TwitterUser } from "../models/user.interface";

const TwitterFollowCard = ({
  name,
  username,
  initialIsFollowed
}: TwitterUser) => {

  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);

  const buttonText = isFollowed ? "Following" : "Follow";
  const buttonClassName = isFollowed ? "is-following" : "";

  const handleFollowing = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <article className="item">
      <header className="item-header">
        <img
          className="item-header__avatar"
          src={`https://unavatar.io/${username}`}
          alt="LoL avatar"
        />
        <div className="user-info">
          <strong className="user-info__name">{name}</strong>
          <span className="user-info__username">@{username}</span>
        </div>
      </header>
      <aside className="item-aside">
        <button
          className={`item-aside__button ${buttonClassName}`}
          onClick={handleFollowing}
        >
          <span className="text-following">{buttonText}</span>
          <span className="text-unfollowing">Unfollowing</span>
        </button>
      </aside>
    </article>
  );
};

export default TwitterFollowCard;
