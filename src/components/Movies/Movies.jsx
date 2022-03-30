import { useState, useEffect } from 'react';
import './movies.scss';

import { useParams } from 'react-router-dom';

import { NOW_PLAYING, UPCOMING, TOP_RATED, POPULAR } from '../Constants';

import FilterMovieCard from '../FilterMovieCard/FilterMovieCard';
import { Dropdown, Accordion, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
  const { type } = useParams();

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [type]);

  //Fetch movies based on type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(null);

  console.log(page);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies(null);
    setHasMore(false);
    setTotalPages(null);

    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.total_pages);
        console.log('====', data.page);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [type]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [filtersArray, setFiltersArray] = useState([]);

  // console.log(filteredMovies);

  movies && console.log(movies.length);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const fetchMoreMovies = () => {
    setLoading(true);
    setError(null);
    setPage(page + 1);

    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${page + 1}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.total_pages);
        console.log('====', data.page);
        setMovies([...movies, ...data.results]);
        setHasMore(data.total_pages > page);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  //Fetch filter
  const [filterList, setFilterList] = useState(null);

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const filterResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await filterResponse.json();
        setFilterList(data.genres);
        console.log('Filter Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchFilter();
  }, []);

  //Fetch filter

  // console.log(filterList);
  // console.log(movies);

  const onMovieClick = (movie) => {
    console.log(movie);
  };

  // console.log(filtersArray);

  console.log(hasMore);

  const toggleFilter = (filter) => {
    if (filtersArray.includes(filter)) {
      setFiltersArray(filtersArray.filter((item) => item !== filter));
    } else {
      setFiltersArray([...filtersArray, filter]);
    }
  };

  const getFilteredMovies = () => {
    if (filtersArray.length > 0) {
      return movies.filter((movie) =>
        filtersArray.some((filter) => movie.genre_ids.includes(filter.id))
      );
    } else {
      return movies;
    }
  };

  const activeTab = 'In_Theaters';

  return (
    <section className='content container'>
      <div className='media'>
        <div className='column d-flex align-items-start w-100 justify-content-center align-content-start'>
          <div className='content_wrapper d-flex align-items-start align-content-start flex-wrap'>
            <div className='title row w-100'>
              <h2 className='w-100 m-0 p-0 fw-bold'>Popular Movies</h2>
            </div>
            <div className='content d-flex align-items-start w-100'>
              <div className='filter-section'>
                <div className='filter-section_wrapper'>
                  <Accordion
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                    }}
                  >
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Sort</Accordion.Header>
                      <Accordion.Body>
                        <h3
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: '100%',
                            fontSize: '1em',
                            fontWeight: '300',
                            marginBottom: '10px',
                          }}
                          className='filter-title p-0'
                        >
                          Sort Results By
                        </h3>
                        <DropdownButton
                          id='dropdown-basic-button'
                          title='Popularity'
                          variant='secondary'
                          style={{
                            width: '100%',
                            fontSize: '1em',
                            fontWeight: '300',
                            marginBottom: '10px',
                          }}
                        >
                          <Dropdown.Item eventKey='1'>
                            Popularity Descending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='2'>
                            Popularity Ascending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='3'>
                            Rating Descending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='4'>
                            Rating Ascending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='4'>
                            Release Date Descending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='4'>
                            Release Date Ascending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='4'>
                            Title (A-Z)
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='4'>
                            Title (Z-A)
                          </Dropdown.Item>
                        </DropdownButton>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className='filter-section_wrapper'>
                  <Accordion
                    style={{
                      width: '100%',
                    }}
                  >
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Filters</Accordion.Header>
                      <Accordion.Body>
                        <h3
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: '100%',
                            fontSize: '1em',
                            fontWeight: '300',
                            marginBottom: '10px',
                          }}
                          className='filter-title p-0'
                        >
                          Generes
                        </h3>
                        <ul className='filter-list p-0'>
                          {filterList &&
                            filterList.map((filter) => (
                              <li
                                key={filter.id}
                                className={`filter-list_item ${
                                  filtersArray.includes(filter.id)
                                    ? 'filter-list_item-active'
                                    : ''
                                }`}
                                onClick={() => {
                                  toggleFilter(filter.id);
                                  console.log(filter.id);
                                }}
                              >
                                {filter.name}
                              </li>
                            ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className='filter-section_wrapper'>
                  <Accordion
                    style={{
                      width: '100%',
                    }}
                  >
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Where To Watch</Accordion.Header>
                      <Accordion.Body>
                        <h3
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: '100%',
                            fontSize: '1em',
                            fontWeight: '300',
                            marginBottom: '10px',
                          }}
                          className='filter-title m-0 p-0'
                        >
                          Sort Results By
                        </h3>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className='search-btn'>Search</div>
              </div>
              <div className='movies-section'>
                <div className='wrapper'>
                  <section className='pannel'>
                    <div className='media_items'>
                      {movies && (
                        <InfiniteScroll
                          dataLength={movies.length}
                          next={() => {
                            fetchMoreMovies();
                          }}
                          hasMore={hasMore}
                          loader={
                            <div className='loader'>
                              <img
                                src={require('../../assets/images/loader.gif')}
                                alt='loader'
                                height={'10px'}
                                width={'10px'}
                              />
                            </div>
                          }
                        >
                          <div className='page_1'>
                            {movies &&
                              movies.map((movie, index) => (
                                <FilterMovieCard
                                  key={index}
                                  id={movie.id}
                                  poster={movie.poster_path}
                                  title={movie.name || movie.title}
                                  date={
                                    movie.first_air_date || movie.release_date
                                  }
                                  rating={movie.vote_average * 10}
                                  onMovieClick={onMovieClick}
                                  activeTab={activeTab}
                                  movie={movie}
                                />
                              ))}
                          </div>
                        </InfiniteScroll>
                      )}
                      {page !== totalPages && (
                        <div className='load_more'>
                          <Link
                            to=''
                            onClick={() => {
                              setHasMore(true);
                            }}
                          >
                            Load More
                          </Link>
                        </div>
                      )}
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
