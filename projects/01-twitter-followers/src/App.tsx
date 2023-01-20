import "./App.css";
import TwitterFollowCard from "./components/TwitterFollowCard";
import { users } from "./data/user";

const twitterUsers = users;

function App() {
  return (
    <div className="App">
      {twitterUsers.map(({ name, username, initialIsFollowed }) => (
        <TwitterFollowCard
          key={username}
          name={name}
          username={username}
          initialIsFollowed={initialIsFollowed}
        />
      ))}
    </div>
  );
}

export default App;
