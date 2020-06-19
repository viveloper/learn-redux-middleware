import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      <Route path="/" exact component={PostListPage} />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
