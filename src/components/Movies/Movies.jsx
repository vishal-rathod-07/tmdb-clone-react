import { useState, useEffect } from 'react';
import './movies.scss';
import { API } from '../Constants';

import { useParams } from 'react-router-dom';

import FilterMovieCard from '../FilterMovieCard/FilterMovieCard';
import { Dropdown, Accordion, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Movies = () => {
  const { showType, categoryType } = useParams();

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [categoryType]);

  //Fetch movies based on type
  const [loading, setLoading] = useState(true); //Loading
  const [error, setError] = useState(null); //Error handling

  const [movies, setMovies] = useState(null); //Array of movies
  const [hasMore, setHasMore] = useState(false); //Infinite scroll
  const [page, setPage] = useState(1); //Page number
  const [totalPages, setTotalPages] = useState(null); //total pages of movies

  const [sortBy, setSortBy] = useState(null); //Sort by popularity or rating or release date or title
  const [dropdownTitle, setDropdownTitle] = useState('Popularity Descending'); //Dropdown title

  useEffect(() => {
    switch (sortBy) {
      case 'popularity.desc':
        setDropdownTitle('Popularity Descending');
        break;
      case 'popularity.asc':
        setDropdownTitle('Popularity Ascending');
        break;
      case 'vote_average.desc':
        setDropdownTitle('Rating Descending');
        break;
      case 'vote_average.asc':
        setDropdownTitle('Rating Ascending');
        break;
      case 'primary_release_date.desc':
        setDropdownTitle('Release Date Descending');
        break;
      case 'primary_release_date.asc':
        setDropdownTitle('Release Date Ascending');
        break;
      case 'title.asc':
        setDropdownTitle('Title (A-Z)');
        break;
      case 'title.desc':
        setDropdownTitle('Title (Z-A)');
        break;
      default:
        setDropdownTitle('Popularity Descending');
        break;
    }
  }, [sortBy]);

  const [activeCountry, setActiveCountry] = useState(null); //Country filter

  const [filteredMovies, setFilteredMovies] = useState(movies); //Filtered movies

  const [filterList, setFilterList] = useState(null); //Filter list
  const [activeFiltersArray, setActiveFiltersArray] = useState([]); //Array of filters

  const [CertificationList, setCertificationList] = useState(null); //Certification list
  const [activeCertificationsArray, setActiveCertificationsArray] = useState(
    []
  ); //Array of certifications

  const [countriesList, setCountriesList] = useState(null); //Countries list

  const [countryIsoList, setCountryIsoList] = useState(null); //Countries list

  const [progress, setProgress] = useState(10); //Progress bar

  const [sortUrl, setSortUrl] = useState(null); //Sort url

  const [startDate, setStartDate] = useState(); //Start date
  const [endDate, setEndDate] = useState(
    //six months from today
    new Date(new Date().setMonth(new Date().getMonth() + 6))
  ); //End date

  const [discoverUrl, setDiscoverUrl] = useState(null); //Discover url

  const [isAllAvailabilities, setIsAllAvailabilities] = useState(true); //All available

  const toggleAllAvailabilities = () => {
    setIsAllAvailabilities(!isAllAvailabilities);
  };

  const [activeAvalabilitiesArray, setActiveAvalabilitiesArray] = useState([
    'flatrate',
    'free',
    'ads',
    'rent',
    'buy',
  ]); //Array of availabilities

  const toggleActiveAvalabilities = (availability) => {
    if (activeAvalabilitiesArray.includes(availability)) {
      setActiveAvalabilitiesArray(
        activeAvalabilitiesArray.filter((item) => item !== availability)
      );
    } else {
      setActiveAvalabilitiesArray([...activeAvalabilitiesArray, availability]);
    }
  };

  const [isAllReleases, setIsAllReleases] = useState(true); //All release dates

  const toggleAllReleaseDates = () => {
    setIsAllReleases(!isAllReleases);
  };

  const [activeReleasesArray, setActiveReleasesArray] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]); //Array of release dates

  const toggleActiveReleases = (release) => {
    if (activeReleasesArray.includes(release)) {
      setActiveReleasesArray(
        activeReleasesArray.filter((item) => item !== release)
      );
    } else {
      setActiveReleasesArray([...activeReleasesArray, release]);
    }
  };

  const [isAllCountries, setIsAllCountries] = useState(true); //All countries

  const toggleAllCountries = () => {
    setIsAllCountries(!isAllCountries);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies(null);
    setHasMore(false);
    setTotalPages(null);
    setSortBy(null);

    fetch(
      `https://api.themoviedb.org/3/${
        showType === 'tv' ? 'tv/' : 'movie/'
      }${categoryType}?api_key=${API}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [showType, categoryType]); //Runs when showType or type changes

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies(null);
    setHasMore(false);
    setTotalPages(null);
    // setSortBy(null);

    fetch(discoverUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, showType, sortUrl, categoryType, discoverUrl]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]); //Runs when movies changes

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const filterResponse = await fetch(
          `https://api.themoviedb.org/3/genre/${
            showType === 'tv' ? 'tv/' : 'movie/'
          }list?api_key=${API}&language=en-US`
        );
        const data = await filterResponse.json();
        setFilterList(data.genres);
      } catch (error) {
        setError(error);
      }
    };
    fetchFilter();
  }, [showType]); //Fetch filter list when show type changes

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesResponse = await fetch(
          `https://api.themoviedb.org/3/configuration/countries?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`
        );
        const data = await countriesResponse.json();
        setCountriesList(
          data.sort((a, b) => {
            if (a.english_name < b.english_name) return -1;
            if (a.english_name > b.english_name) return 1;
            return 0;
          })
        );
        setCountryIsoList(data.map((item) => item.iso_3166_1));
        console.log(data);
        console.log(data.map((item) => item.iso_3166_1));
        // console.log(data.map((country) => country.english_name));
      } catch (error) {
        setError(error);
      }
    };
    fetchCountries();

    const fetchCertification = async () => {
      try {
        const certificationResponse = await fetch(
          `https://api.themoviedb.org/3/certification/movie/list?api_key=${API}&language=en-US`
        );
        const data = await certificationResponse.json();
        setCertificationList(data.certifications.IN);
        console.log(data.certifications.IN);
      } catch (error) {
        setError(error);
      }
    };
    fetchCertification();
  }, []); //Fetch countries and certification list

  const fetchMoreMovies = () => {
    setLoading(true);
    setError(null);
    setPage(page + 1);

    fetch(`${discoverUrl}&page=${page + 1}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.total_pages);
        console.log('====', data.page);
        setMovies([...movies, ...data.results]);
        setHasMore(data.total_pages > page);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }; //Fetch more movies

  const onMovieClick = (movie) => {
    console.log(movie);
  };

  const handleSearch = () => {
    setDiscoverUrl(
      `https://api.themoviedb.org/3/discover/${showType}?api_key=${API}&sort_by=${
        sortBy ? sortBy : 'popularity.desc'
      }&page=${page}&with_ott_monetization_types=${
        isAllAvailabilities ? '' : activeAvalabilitiesArray.join('%7C')
      }&certification_country=IN&certification=${
        activeCertificationsArray.length > 0
          ? activeCertificationsArray.map(
              (item, index) => `${item}
          ${index === activeCertificationsArray.length - 1 ? '' : '%7C'}
          `
            )
          : ''
      }&release_date.gte=${
        startDate ? `${startDate.toISOString().split('T')[0]}` : ''
      }&release_date.lte=${
        endDate ? `${endDate.toISOString().split('T')[0]}` : ''
      }&with_genres=${
        activeFiltersArray.length > 0 ? activeFiltersArray.join('%2C') : ''
      }&region=${activeCountry ? activeCountry : ''}&with_release_type=${
        activeReleasesArray.length > 0 ? activeReleasesArray.join('%7C') : ''
      }`
    );
  };

  // useEffect(() => {
  //   if (sortBy) {
  //     const filtered = movies.filter((movie) => {
  //       return movie.genre_ids.includes(sortBy);
  //     });
  //     setFilteredMovies(filtered);
  //   } else {
  //     setFilteredMovies(movies);
  //   }
  // }, [sortBy]);

  // console.log(filtersArray);

  // console.log(hasMore);

  const toggleFilter = (filter) => {
    if (activeFiltersArray.includes(filter)) {
      setActiveFiltersArray(
        activeFiltersArray.filter((item) => item !== filter)
      );
    } else {
      setActiveFiltersArray([...activeFiltersArray, filter]);
    }
  };

  const toggleCertification = (certification) => {
    if (activeCertificationsArray.includes(certification)) {
      setActiveCertificationsArray(
        activeCertificationsArray.filter((item) => item !== certification)
      );
    } else {
      setActiveCertificationsArray([
        ...activeCertificationsArray,
        certification,
      ]);
    }
  };

  // const getFilteredMovies = () => {
  //   if (filtersArray.length > 0) {
  //     return movies.filter((movie) =>
  //       filtersArray.some((filter) => movie.genre_ids.includes(filter.id))
  //     );
  //   } else {
  //     return movies;
  //   }
  // };

  return (
    <>
      <LoadingBar
        color='#01b4e4'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={true}
        height={4}
        transitionTime={400}
      />
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
                      defaultActiveKey='0'
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
                              color: '#000',
                            }}
                            className='filter-title p-0'
                          >
                            Sort Results By
                          </h3>
                          <DropdownButton
                            id='dropdown-basic-button'
                            title={dropdownTitle}
                            variant='secondary'
                            style={{
                              width: '100%',
                              fontSize: '1em',
                              fontWeight: '300',
                            }}
                            onSelect={(eventKey) => {
                              console.log(eventKey);
                              setSortBy(eventKey);
                            }}
                          >
                            <Dropdown.Item eventKey='popularity.desc'>
                              Popularity Descending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='popularity.asc'>
                              Popularity Ascending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='vote_average.desc'>
                              Rating Descending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='vote_average.asc'>
                              Rating Ascending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='primary_release_date.desc'>
                              Release Date Descending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='primary_release_date.asc'>
                              Release Date Ascending
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='title.asc'>
                              Title (A-Z)
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='title.desc'>
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
                              color: '#000',
                              color: '#000',
                            }}
                            className='filter-title p-0'
                          >
                            Availabilities
                          </h3>
                          <label className='all_availablities'>
                            <div className='form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id='exampleCheck1'
                                onChange={toggleAllAvailabilities}
                                checked={isAllAvailabilities}
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck1'
                              >
                                Search all availabilities?
                              </label>
                            </div>
                          </label>
                          {!isAllAvailabilities && (
                            <div className='availabilities_wrapper d-flex flex-column'>
                              <label className='all_availablities'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='monetization_type_flatrate'
                                    value='flatrate'
                                    onChange={() =>
                                      toggleActiveAvalabilities('flatrate')
                                    }
                                    checked={activeAvalabilitiesArray.includes(
                                      'flatrate'
                                    )}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='monetization_type_flatrate'
                                  >
                                    Stream
                                  </label>
                                </div>
                              </label>
                              <label className='all_availablities'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='monetization_type_free'
                                    value='free'
                                    onChange={() =>
                                      toggleActiveAvalabilities('free')
                                    }
                                    checked={activeAvalabilitiesArray.includes(
                                      'free'
                                    )}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='monetization_type_free'
                                  >
                                    Free
                                  </label>
                                </div>
                              </label>
                              <label className='all_availablities'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='monetization_type_ads'
                                    value='ads'
                                    onChange={() =>
                                      toggleActiveAvalabilities('ads')
                                    }
                                    checked={activeAvalabilitiesArray.includes(
                                      'ads'
                                    )}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='monetization_type_ads'
                                  >
                                    Ads
                                  </label>
                                </div>
                              </label>
                              <label className='all_availablities'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='monetization_type_rent'
                                    value='rent'
                                    onChange={() =>
                                      toggleActiveAvalabilities('rent')
                                    }
                                    checked={activeAvalabilitiesArray.includes(
                                      'rent'
                                    )}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='monetization_type_rent'
                                  >
                                    Rent
                                  </label>
                                </div>
                              </label>
                              <label className='all_availablities'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='monetization_type_buy'
                                    value='buy'
                                    onChange={() =>
                                      toggleActiveAvalabilities('buy')
                                    }
                                    checked={activeAvalabilitiesArray.includes(
                                      'buy'
                                    )}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='monetization_type_buy'
                                  >
                                    Buy
                                  </label>
                                </div>
                              </label>
                            </div>
                          )}
                        </Accordion.Body>
                        <Accordion.Body>
                          <h3
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              width: '100%',
                              fontSize: '1em',
                              fontWeight: '300',
                              marginBottom: '10px',
                              color: '#000',
                            }}
                            className='filter-title p-0'
                          >
                            Release Dates
                          </h3>
                          <label className='release_type'>
                            <div className='form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id='exampleCheck1'
                                onChange={toggleAllReleaseDates}
                                checked={isAllReleases}
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck1'
                              >
                                Search all releases?
                              </label>
                            </div>
                          </label>
                          {!isAllReleases && (
                            <div className='release_type_wrapper d-flex flex-column'>
                              <label className='all_countries'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='exampleCheck1'
                                    onChange={toggleAllCountries}
                                    checked={isAllCountries}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='exampleCheck1'
                                  >
                                    Search all countries?
                                  </label>
                                </div>
                              </label>
                              {!isAllCountries && (
                                <div className='all_countries_wrapper'>
                                  <DropdownButton
                                    id='dropdown-basic-button'
                                    title={
                                      activeCountry
                                        ? countriesList.find(
                                            (country) =>
                                              country.iso_3166_1 ===
                                              activeCountry
                                          ).english_name
                                        : 'Countries'
                                    }
                                    variant='secondary'
                                    style={{
                                      width: '100%',
                                      fontSize: '1em',
                                      fontWeight: '300',
                                      marginBottom: '10px',
                                    }}
                                    onSelect={(eventKey) => {
                                      console.log(eventKey);
                                      setActiveCountry(eventKey);
                                    }}
                                  >
                                    {countriesList.map((country) => (
                                      <Dropdown.Item
                                        key={country.iso_3166_1}
                                        eventKey={country.iso_3166_1}
                                      >
                                        {country.english_name}
                                      </Dropdown.Item>
                                    ))}

                                    {/* .map((country) => country.english_name)
            .sort((a, b) => a.localeCompare(b) */}
                                  </DropdownButton>
                                </div>
                              )}
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_1'
                                    value='1'
                                    onChange={() => toggleActiveReleases('1')}
                                    checked={activeReleasesArray.includes('1')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_1'
                                  >
                                    Premiere
                                  </label>
                                </div>
                              </label>
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_2'
                                    value='2'
                                    onChange={() => toggleActiveReleases('2')}
                                    checked={activeReleasesArray.includes('2')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_2'
                                  >
                                    Theatrical (limited)
                                  </label>
                                </div>
                              </label>
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_3'
                                    value='3'
                                    onChange={() => toggleActiveReleases('3')}
                                    checked={activeReleasesArray.includes('3')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_3'
                                  >
                                    Theatrical
                                  </label>
                                </div>
                              </label>
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_4'
                                    value='4'
                                    onChange={() => toggleActiveReleases('4')}
                                    checked={activeReleasesArray.includes('4')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_4'
                                  >
                                    Digital
                                  </label>
                                </div>
                              </label>
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_5'
                                    value='5'
                                    onChange={() => toggleActiveReleases('5')}
                                    checked={activeReleasesArray.includes('5')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_5'
                                  >
                                    Physical
                                  </label>
                                </div>
                              </label>
                              <label className='all_release_type'>
                                <div className='form-check'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='release_type_6'
                                    value='6'
                                    onChange={() => toggleActiveReleases('6')}
                                    checked={activeReleasesArray.includes('6')}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='release_type_6'
                                  >
                                    TV
                                  </label>
                                </div>
                              </label>
                            </div>
                          )}

                          <div className='year_column d-flex justify-content-between'>
                            <span className='year_column_title'>from</span>
                            <span className='date_picker w-100'>
                              <span className='date_picker_wrapper'>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                />
                              </span>
                            </span>
                          </div>
                          <div className='year_column d-flex '>
                            <span className='year_column_title'>to</span>
                            <span className='date_picker w-100'>
                              <span className='date_picker_wrapper'>
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                />
                              </span>
                            </span>
                          </div>
                        </Accordion.Body>
                        <Accordion.Body>
                          <h3
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              width: '100%',
                              fontSize: '1em',
                              fontWeight: '300',
                              marginBottom: '10px',
                              color: '#000',
                            }}
                            className='filter-title p-0'
                          >
                            Genres
                          </h3>
                          <ul className='filter-list p-0'>
                            {filterList &&
                              filterList.map((filter) => (
                                <li
                                  key={filter.id}
                                  className={`filter-list_item ${
                                    activeFiltersArray.includes(filter.id)
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
                        <Accordion.Body>
                          <h3
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              width: '100%',
                              fontSize: '1em',
                              fontWeight: '300',
                              marginBottom: '10px',
                              color: '#000',
                            }}
                            className='filter-title p-0'
                          >
                            Certification
                          </h3>
                          <ul className='filter-list p-0'>
                            {CertificationList &&
                              CertificationList.map((certification, index) => (
                                <li
                                  key={index}
                                  className={`filter-list_item ${
                                    activeCertificationsArray.includes(
                                      certification.certification
                                    )
                                      ? 'filter-list_item-active'
                                      : ''
                                  }`}
                                  onClick={() => {
                                    toggleCertification(
                                      certification.certification
                                    );
                                    console.log(certification.certification);
                                  }}
                                >
                                  {certification.certification}
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
                              color: '#000',
                            }}
                            className='filter-title m-0 p-0'
                          >
                            Sort Results By
                          </h3>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className='search-btn' onClick={handleSearch}>
                    Search
                  </div>
                </div>
                <div className='movies-section'>
                  <div className='wrapper'>
                    <section className='pannel'>
                      <div className='media_items'>
                        {loading && (
                          <div className='loader'>
                            <img
                              src={require('../../assets/images/loader.gif')}
                              alt='loader'
                            />
                          </div>
                        )}
                        {movies && (
                          <InfiniteScroll
                            dataLength={movies.length}
                            next={() => {
                              setProgress(50);
                              fetchMoreMovies();
                            }}
                            hasMore={hasMore}
                            loader={
                              <div className='loader'>
                                <img
                                  src={require('../../assets/images/loader.gif')}
                                  alt='loader'
                                />
                              </div>
                            }
                          >
                            <div className='page_1'>
                              {filteredMovies ? (
                                filteredMovies.map((movie, index) => (
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
                                    showType={showType}
                                    movie={movie}
                                  />
                                ))
                              ) : (
                                <div>
                                  No items were found that match your query.
                                </div>
                              )}
                            </div>
                          </InfiniteScroll>
                        )}

                        {page !== totalPages && (
                          <div className='load_more'>
                            <Link
                              to=''
                              onClick={() => {
                                setHasMore(true);
                                fetchMoreMovies();
                                setProgress(50);
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
    </>
  );
};

export default Movies;
