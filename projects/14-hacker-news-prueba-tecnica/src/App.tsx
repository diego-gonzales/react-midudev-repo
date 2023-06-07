import { Route } from 'wouter';
import { Navbar } from './components/Navbar/Navbar';
import { lazy, Suspense, useEffect } from 'react';
import './App.css';

const StoriesPage = lazy(() => import('./pages/Stories'));
const StoryDetailPage = lazy(() => import('./pages/StoryDetail'));

function App() {
  useEffect(() => {
    document.title = 'Hacker News Technical Test';
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Route path="/" component={StoriesPage} />
          {/* the `params` prop will be passed down to <DetailPage /> thanks to Wouter */}
          <Route path="/article/:id" component={StoryDetailPage} />
        </Suspense>
      </main>
    </>
  );
}

export default App;
