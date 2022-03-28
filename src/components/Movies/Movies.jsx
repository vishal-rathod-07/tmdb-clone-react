import { useState, useEffect } from 'react';
import url from '../Constants';

import { POPULAR_IN_THEATERS } from '../Constants';

import MovieCard from '../MovieCard/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      console.log(POPULAR_IN_THEATERS);
      const response = await fetch(POPULAR_IN_THEATERS);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  const onMovieClick = (movie) => {
    console.log(movie);
  };

  const activeTab = 'In_Theaters';

  return (
    <section className='content container'>
      <div className='media'>
        <div className='column'>
          <div className='content_wrapper'>
            <div className='title row'>
              <h2>Popular Movies</h2>
            </div>
            <div className='content row'>
              <div className='filter-section col-3'>
                <div className='filter-section_wrapper'>1</div>
                <div className='filter-section_wrapper'>2</div>
                <div className='filter-section_wrapper'>3</div>
                <div className='filter-section_wrapper'>4</div>
              </div>
              <div className='movies-section col-9'>
                <div className='wrapper'>
                  <section className='pannel'>
                    <div className='media_items'>
                      <div className='page_1'>
                        {movies.map((movie, index) => (
                          <MovieCard
                            key={index}
                            id={movie.id}
                            poster={movie.poster_path}
                            title={movie.name || movie.title}
                            date={movie.first_air_date || movie.release_date}
                            rating={movie.vote_average * 10}
                            onMovieClick={onMovieClick}
                            activeTab={activeTab}
                            movie={movie}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
