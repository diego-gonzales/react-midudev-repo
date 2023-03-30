import { lazy, Suspense } from "react";
import "./App.css";
import { Route } from "./Route";
import { Router } from "./Router";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Search = lazy(() => import("./pages/Search"));
const PageNotFound = lazy(() => import("./pages/Page404"));

const routes = [
  {
    path: "/search/:query",
    component: Search,
  },
  {
    path: "/:lang/about",
    component: About,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Router routes={routes} defaultComponent={PageNotFound}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
