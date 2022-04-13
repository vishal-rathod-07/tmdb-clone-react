import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import PageNotFound from './pages/404Page/PageNotFound';
import Footer from './components/Footer/Footer';

import './app.scss';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense
        fallback={<img src='./assets/images/loader.gif' alt='loading' />}
      >
        <div className='app'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/:showType/category/:categoryType'
              element={<CategoryPage />}
            />
            <Route path='/:type/:id' element={<MovieDetailsPage />} />
            <Route path='*' exact={true} element={<PageNotFound />} />
          </Routes>
        </div>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
