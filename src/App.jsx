import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import PageNotFound from './pages/404Page/PageNotFound';
import Footer from './components/Footer/Footer';

import './app.scss';

const App = () => {
  return (
    <Router>
      <Navbar />
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
      <Footer />
    </Router>
  );
};

export default App;
