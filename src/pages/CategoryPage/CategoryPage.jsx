import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown, Accordion, DropdownButton, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';
import DatePicker from 'react-datepicker';

import { API } from '../../Constants';
import FilterMovieCard from '../../components/FilterMovieCard/FilterMovieCard';

import 'react-datepicker/dist/react-datepicker.css';
import './categorypage.scss';

import getInitialParams from '../../components/util/InitialParams';

function SortSectionAccordian(props) {
  return (
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
              title={props.dropdownTitle}
              variant='secondary'
              style={{
                width: '100%',
                fontSize: '1em',
                fontWeight: '300',
              }}
              onSelect={(eventKey) => {
                props.setUrlParams({ ...props.urlParams, sort_by: eventKey });
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
              <Dropdown.Item eventKey='title.asc'>Title (A-Z)</Dropdown.Item>
              <Dropdown.Item eventKey='title.desc'>Title (Z-A)</Dropdown.Item>
            </DropdownButton>
            {/* <Form.Select
           aria-label='Default select example'
           defaultValue={urlParams.sort_by}
           onChange={(event) => {
             setUrlParams({
               ...urlParams,
               sort_by: event.target.value,
             });
           }}
           style={{
             width: '100%',
             fontSize: '1em',
             fontWeight: '300',
           }}
          >
           <option value='popularity.desc'>
             Popularity Descending
           </option>
           <option value='popularity.asc'>
             Popularity Ascending
           </option>
           <option value='vote_average.desc'>
             Rating Descending
           </option>
           <option value='vote_average.asc'>
             Rating Ascending
           </option>
           <option value='primary_release_date.desc'>
             Release Date Descending
           </option>
           <option value='primary_release_date.asc'>
             Release Date Ascending
           </option>
           <option value='title.asc'>Title (A-Z)</option>
           <option value='title.desc'>Title (Z-A)</option>
          </Form.Select> */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

function FilterSectionAccordian(props) {
  return (
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
                  onChange={props.toggleAllAvailabilities}
                  checked={props.isAllAvailabilities}
                />
                <label className='form-check-label' htmlFor='exampleCheck1'>
                  Search all availabilities?
                </label>
              </div>
            </label>
            {!props.isAllAvailabilities && (
              <div className='availabilities_wrapper d-flex flex-column'>
                <label className='all_availablities'>
                  <div className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='monetization_type_flatrate'
                      value='flatrate'
                      onChange={() =>
                        props.toggleActiveAvalabilities('flatrate')
                      }
                      checked={props.activeAvalabilitiesArray.includes(
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
                      onChange={() => props.toggleActiveAvalabilities('free')}
                      checked={props.activeAvalabilitiesArray.includes('free')}
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
                      onChange={() => props.toggleActiveAvalabilities('ads')}
                      checked={props.activeAvalabilitiesArray.includes('ads')}
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
                      onChange={() => props.toggleActiveAvalabilities('rent')}
                      checked={props.activeAvalabilitiesArray.includes('rent')}
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
                      onChange={() => props.toggleActiveAvalabilities('buy')}
                      checked={props.activeAvalabilitiesArray.includes('buy')}
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
                  onChange={props.toggleAllReleaseDates}
                  checked={props.isAllReleases}
                />
                <label className='form-check-label' htmlFor='exampleCheck1'>
                  Search all releases?
                </label>
              </div>
            </label>
            {!props.isAllReleases && (
              <div className='release_type_wrapper d-flex flex-column'>
                <label className='all_countries'>
                  <div className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='exampleCheck1'
                      onChange={props.toggleAllCountries}
                      checked={props.isAllCountries}
                    />
                    <label className='form-check-label' htmlFor='exampleCheck1'>
                      Search all countries?
                    </label>
                  </div>
                </label>
                {!props.isAllCountries && (
                  <div className='all_countries_wrapper'>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title={
                        props.urlParams.region
                          ? props.countriesList.find(
                              (country) =>
                                country.iso_3166_1 === props.urlParams.region
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
                        props.setUrlParams({
                          ...props.urlParams,
                          region: eventKey,
                        });
                      }}
                    >
                      {props.countriesList.map((country) => (
                        <Dropdown.Item
                          key={country.iso_3166_1}
                          eventKey={country.iso_3166_1}
                        >
                          <img // src={`https://countryflagsapi.com/png/${country.iso_3166_1}`}
                            src={`https://flagcdn.com/w20/${country.iso_3166_1.toLowerCase()}.png`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wkWFOYkdG7W9Xf0-aheuTMQHTEsySnpXOQ&usqp=CAU';
                            }}
                            style={{
                              width: '24px',
                              height: '20px',
                              marginRight: '10px',
                            }}
                            alt={country.iso_3166_1}
                          />

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
                      onChange={() => props.toggleActiveReleases('1')}
                      checked={props.activeReleaseTypesArray.includes('1')}
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
                      onChange={() => props.toggleActiveReleases('2')}
                      checked={props.activeReleaseTypesArray.includes('2')}
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
                      onChange={() => props.toggleActiveReleases('3')}
                      checked={props.activeReleaseTypesArray.includes('3')}
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
                      onChange={() => props.toggleActiveReleases('4')}
                      checked={props.activeReleaseTypesArray.includes('4')}
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
                      onChange={() => props.toggleActiveReleases('5')}
                      checked={props.activeReleaseTypesArray.includes('5')}
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
                      onChange={() => props.toggleActiveReleases('6')}
                      checked={props.activeReleaseTypesArray.includes('6')}
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
                    selected={
                      props.showType === 'tv'
                        ? props.urlParams['air_date.gte']
                          ? new Date(props.urlParams['air_date.gte'])
                          : ''
                        : props.urlParams['air_date.gte']
                        ? new Date(props.urlParams['release_date.gte'])
                        : ''
                    }
                    onChange={(date) => {
                      if (props.showType === 'tv') {
                        props.setUrlParams({
                          ...props.urlParams,
                          'air_date.gte': date.toISOString().split('T')[0],
                        });
                      }

                      if (props.showType === 'movie') {
                        props.setUrlParams({
                          ...props.urlParams,
                          'release_date.gte': date.toISOString().split('T')[0],
                        });
                      }
                    }}
                  />
                </span>
              </span>
            </div>
            <div className='year_column d-flex '>
              <span className='year_column_title'>to</span>
              <span className='date_picker w-100'>
                <span className='date_picker_wrapper'>
                  <DatePicker
                    selected={
                      props.showType === 'tv'
                        ? props.urlParams['air_date.lte']
                          ? new Date(props.urlParams['air_date.lte'])
                          : ''
                        : props.urlParams['release_date.lte']
                        ? new Date(props.urlParams['release_date.lte'])
                        : ''
                    }
                    onChange={(date) => {
                      if (props.showType === 'tv') {
                        props.setUrlParams({
                          ...props.urlParams,
                          'air_date.lte': date.toISOString().split('T')[0],
                        });
                      }

                      if (props.showType === 'movie') {
                        props.setUrlParams({
                          ...props.urlParams,
                          'release_date.lte': date.toISOString().split('T')[0],
                        });
                      }
                    }}
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
              {props.genresList &&
                props.genresList.map((filter) => (
                  <li
                    key={filter.id}
                    className={`filter-list_item ${
                      props.activeGenresArray.includes(filter.id)
                        ? 'filter-list_item-active'
                        : ''
                    }`}
                    onClick={() => {
                      props.toggleFilter(filter.id);
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
              {props.CertificationList &&
                props.CertificationList.map((item, index) => (
                  <li
                    key={index}
                    className={`filter-list_item ${
                      props.activeCertificationsArray.includes(
                        item.certification
                      )
                        ? 'filter-list_item-active'
                        : ''
                    }`}
                    onClick={() => {
                      props.toggleCertification(item.certification);
                    }}
                  >
                    {item.certification}
                  </li>
                ))}
            </ul>
          </Accordion.Body>
          <Accordion.Body className='Language-filter'>
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
              Language
            </h3>
            {props.languagesList && (
              <DropdownButton
                id='dropdown-basic-button'
                title={
                  props.urlParams.with_original_language
                    ? props.languagesList.find(
                        (language) =>
                          language.iso_639_1 ===
                          props.urlParams.with_original_language
                      ).english_name
                    : 'None Selected'
                }
                variant='secondary'
                style={{
                  width: '100%',
                  fontSize: '1em',
                  fontWeight: '300',
                  marginBottom: '10px',
                }}
                onSelect={(eventKey) => {
                  props.setUrlParams({
                    ...props.urlParams,
                    with_original_language: eventKey,
                  });
                }}
              >
                {props.languagesList.map((language) => (
                  <Dropdown.Item
                    key={language.iso_639_1}
                    eventKey={language.iso_639_1}
                  >
                    {language.english_name}
                  </Dropdown.Item>
                ))}

                {/* .map((country) => country.english_name)
            .sort((a, b) => a.localeCompare(b) */}
              </DropdownButton>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

const CategoryPage = () => {
  const { showType, categoryType } = useParams(); // Get params from url

  // Default Parameters when categoryType changed
  const [defaultParams, setDefaultParams] = useState(
    getInitialParams(showType, categoryType)
  );

  // Parameters when filter changes
  const [urlParams, setUrlParams] = useState(
    getInitialParams(showType, categoryType)
  );

  useEffect(() => {
    setUrlParams(getInitialParams(showType, categoryType));
    setDefaultParams(getInitialParams(showType, categoryType));
  }, [showType, categoryType]);

  const [movies, setMovies] = useState(null); //Array of movies

  const generateUrl = useCallback(
    (params) => {
      let url = `https://api.themoviedb.org/3/discover/${showType}?api_key=${API}`;
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url = `${url}&${key}=${params[key]}`;
        }
      });
      return url;
    },
    [showType]
  );

  const [discoverUrl, setDiscoverUrl] = useState(generateUrl(urlParams));

  useEffect(() => {
    setDiscoverUrl(generateUrl(defaultParams));
  }, [defaultParams, generateUrl]);

  //Fetch movies based on type
  const [loading, setLoading] = useState(true); //Loading
  const [error, setError] = useState(null); //Error handling

  const [hasMore, setHasMore] = useState(false); //Infinite scroll
  const [totalPages, setTotalPages] = useState(null); //total pages of movies

  const [dropdownTitle, setDropdownTitle] = useState('Popularity Descending'); //Dropdown title

  useEffect(() => {
    switch (urlParams.sort_by) {
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
  }, [urlParams.sort_by]);

  const [genresList, setGenresList] = useState(null); //Filter list
  const [activeGenresArray, setActiveGenresArray] = useState([]); //Array of filters

  const [CertificationList, setCertificationList] = useState(null); //Certification list
  const [activeCertificationsArray, setActiveCertificationsArray] = useState(
    []
  ); //Array of certifications

  const [countriesList, setCountriesList] = useState(null); //Countries list

  const [ottRegionsList, setOttRegionsList] = useState(null); //OTT Regions list

  const [progress, setProgress] = useState(10); //Progress bar

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

  const [activeReleaseTypesArray, setActiveReleaseTypesArray] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]); //Array of release dates

  const toggleActiveReleases = (release) => {
    if (activeReleaseTypesArray.includes(release)) {
      setActiveReleaseTypesArray(
        activeReleaseTypesArray.filter((item) => item !== release)
      );
    } else {
      setActiveReleaseTypesArray([...activeReleaseTypesArray, release]);
    }
  };

  const [isAllCountries, setIsAllCountries] = useState(true); //All countries

  const [languagesList, setLanguagesList] = useState(null); //Languages list

  const toggleAllCountries = () => {
    setIsAllCountries(!isAllCountries);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies(null);
    setHasMore(false);
    setTotalPages(null);

    fetch(discoverUrl)
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
  }, [urlParams.page, showType, categoryType, discoverUrl]);

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const filterResponse = await fetch(
          `https://api.themoviedb.org/3/genre/${
            showType === 'tv' ? 'tv/' : 'movie/'
          }list?api_key=${API}&language=en-US`
        );
        const data = await filterResponse.json();
        setGenresList(data.genres);
      } catch (error) {
        setError(error);
      }
    };
    fetchFilter();
  }, [showType]); //Fetch filter list when show type changes

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesResponse = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${API}`
        );
        const data = await languagesResponse.json();
        setLanguagesList(
          data.sort((a, b) => {
            if (a.english_name < b.english_name) return -1;
            if (a.english_name > b.english_name) return 1;
            return 0;
          })
        );
      } catch (error) {
        setError(error);
      }
    };
    fetchLanguages();

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
      } catch (error) {
        setError(error);
      }
    };
    fetchCountries();

    const fetchOttRegions = async () => {
      try {
        const ottRegionsResponse = await fetch(
          `https://api.themoviedb.org/3/watch/providers/regions?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`
        );
        const data = await ottRegionsResponse.json();
        setOttRegionsList(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchOttRegions();

    const fetchCertification = async () => {
      try {
        const certificationResponse = await fetch(
          `https://api.themoviedb.org/3/certification/movie/list?api_key=${API}&language=en-US`
        );
        const data = await certificationResponse.json();
        setCertificationList(data.certifications.IN);
      } catch (error) {
        setError(error);
      }
    };
    fetchCertification();
  }, []); //Fetch countries and certification list

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_ott_monetization_types:
        activeAvalabilitiesArray.length > 0 &&
        activeAvalabilitiesArray.join('%7C'),
    });
  }, [activeAvalabilitiesArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      certification:
        activeCertificationsArray.length > 0 &&
        activeCertificationsArray.join('%7C'),
    });
    console.log(urlParams.certification);
  }, [activeCertificationsArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_genres:
        activeGenresArray.length > 0 && activeGenresArray.join('%2C'),
    });
  }, [activeGenresArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_release_type:
        activeReleaseTypesArray.length > 0 &&
        activeReleaseTypesArray.join('%7C'),
    });
  }, [activeReleaseTypesArray]);

  const fetchMoreMovies = () => {
    setLoading(true);
    setError(null);
    setUrlParams({
      ...urlParams,
      page: urlParams.page + 1,
    });
    setDiscoverUrl(generateUrl(urlParams));

    fetch(discoverUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies([...movies, ...data.results]);
        setTotalPages(data.total_pages);
        setHasMore(data.total_pages > urlParams.page);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }; //Fetch more movies

  const handleSearch = () => {
    const url = generateUrl(urlParams, showType);
    setDiscoverUrl(url);
  };

  const toggleFilter = (filter) => {
    if (activeGenresArray.includes(filter)) {
      setActiveGenresArray(activeGenresArray.filter((item) => item !== filter));
    } else {
      setActiveGenresArray([...activeGenresArray, filter]);
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
                  <SortSectionAccordian
                    urlParams={urlParams}
                    setUrlParams={setUrlParams}
                    dropdownTitle={dropdownTitle}
                  ></SortSectionAccordian>
                  <FilterSectionAccordian
                    showType={showType}
                    urlParams={urlParams}
                    setUrlParams={setUrlParams}
                    genresList={genresList}
                    activeGenresArray={activeGenresArray}
                    CertificationList={CertificationList}
                    activeCertificationsArray={activeCertificationsArray}
                    countriesList={countriesList}
                    isAllAvailabilities={isAllAvailabilities}
                    toggleAllAvailabilities={toggleAllAvailabilities}
                    activeAvalabilitiesArray={activeAvalabilitiesArray}
                    toggleActiveAvalabilities={toggleActiveAvalabilities}
                    isAllReleases={isAllReleases}
                    toggleAllReleaseDates={toggleAllReleaseDates}
                    activeReleaseTypesArray={activeReleaseTypesArray}
                    toggleActiveReleases={toggleActiveReleases}
                    isAllCountries={isAllCountries}
                    languagesList={languagesList}
                    toggleAllCountries={toggleAllCountries}
                    toggleFilter={toggleFilter}
                    toggleCertification={toggleCertification}
                  ></FilterSectionAccordian>
                  <div className='filter-section_wrapper'>
                    <Accordion
                      style={{
                        width: '100%',
                      }}
                    >
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>Where To Watch</Accordion.Header>
                        <Accordion.Body className='ott-provider-filter'>
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
                            Country
                          </h3>
                          {ottRegionsList && (
                            <DropdownButton
                              id='dropdown-basic-button'
                              title={
                                urlParams.ott_region
                                  ? ottRegionsList.find(
                                      (country) =>
                                        country.iso_3166_1 ===
                                        urlParams.ott_region
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
                                setUrlParams({
                                  ...urlParams,
                                  ott_region: eventKey,
                                });
                              }}
                            >
                              {ottRegionsList.map((country) => (
                                <Dropdown.Item
                                  key={country.iso_3166_1}
                                  eventKey={country.iso_3166_1}
                                >
                                  <img
                                    src={`https://flagcdn.com/w20/${country.iso_3166_1.toLowerCase()}.png`}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wkWFOYkdG7W9Xf0-aheuTMQHTEsySnpXOQ&usqp=CAU';
                                    }}
                                    style={{
                                      width: '24px',
                                      height: '20px',
                                      marginRight: '10px',
                                    }}
                                    alt={country.iso_3166_1}
                                  />

                                  {country.native_name}
                                </Dropdown.Item>
                              ))}
                            </DropdownButton>
                          )}
                          <span className='ott_provider_wrapper'>
                            <ul className='ott_providers'>
                              <li>
                                <Link to=''>
                                  <img
                                    src='https://www.themoviedb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg'
                                    width='50'
                                    height='50'
                                    alt='Netflix'
                                  />
                                </Link>
                              </li>
                            </ul>
                          </span>
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
                              {movies ? (
                                movies.map((movie, index) => (
                                  <FilterMovieCard
                                    key={index}
                                    id={movie.id}
                                    poster={movie.poster_path}
                                    title={movie.name ?? movie.title}
                                    date={
                                      movie.first_air_date ?? movie.release_date
                                    }
                                    rating={movie.vote_average * 10}
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

                        {urlParams.page !== totalPages && !loading && (
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

export default CategoryPage;
