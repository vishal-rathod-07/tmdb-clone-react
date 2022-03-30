import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Footer from './components/Footer/Footer';

import './app.scss';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route exact path='/movie' element={<Movies type={'popular'} />} />
          {/*<Route
            path='/movie/:now-playing'
            element={<Movies type={'nowPlaying'} />}
          />
          <Route
            path='/movie/:upcoming'
            element={<Movies type={'upcoming'} />}
          /> */}
          <Route path='/:showType/category/:type' element={<Movies />} />
          <Route path='/:type/:id' element={<MovieDetail />} />
          <Route path='*' exact={true} element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
