import { useState, useEffect } from 'react';
import './movies.scss';

import { useParams } from 'react-router-dom';

import { NOW_PLAYING, UPCOMING, TOP_RATED, POPULAR } from '../Constants';

import FilterMovieCard from '../FilterMovieCard/FilterMovieCard';
import { Dropdown, Accordion, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Movies = () => {
  const { type } = useParams();

  //Fetch movies based on type
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersArray, setFiltersArray] = useState([]);
  const [sortFilter, setSortFilter] = useState(null);

  console.log(filteredMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        );
        const data = await moviesResponse.json();
        setMovies(data.results);
        setLoading(false);
        console.log('Movies Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();
  }, [type]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

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

  //Fetch sort filter
  const [sortFilterList, setSortFilterList] = useState(null);

  useEffect(() => {
    const fetchSortFilter = async () => {
      try {
        const sortFilterResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${type}/statuses?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await sortFilterResponse.json();
        setSortFilterList(data.statuses);
        console.log('Sort Filter Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchSortFilter();
  }, [type]);

  //Fetch filter
  const [filterSelected, setFilterSelected] = useState(null);

  useEffect(() => {
    const fetchFilterSelected = async () => {
      try {
        const filterSelectedResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await filterSelectedResponse.json();
        setFilterSelected(data.results);
        console.log('Filter Selected Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchFilterSelected();
  }, [type]);

  console.log(filterList);
  console.log(movies);

  const onMovieClick = (movie) => {
    console.log(movie);
  };

  console.log(filtersArray);

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

  const getFilteredMoviesBySort = () => {
    if (sortFilter) {
      return movies.filter((movie) => movie.status === sortFilter);
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
                <div
                  className='search-btn'
                  onClick={() => {
                    setFiltersArray([]);
                    setSortFilter('');
                    setFilteredMovies(getFilteredMovies());
                  }}
                >
                  Search
                </div>
              </div>
              <div className='movies-section'>
                <div className='wrapper'>
                  <section className='pannel'>
                    <div className='media_items'>
                      <div className='page_1'>
                        {movies &&
                          movies.map((movie, index) => (
                            <FilterMovieCard
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
                      <div className='load_more'>
                        <Link to='/movies'>Load More</Link>
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
