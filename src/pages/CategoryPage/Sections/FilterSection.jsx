import { useEffect, useState } from 'react';

import { Slider } from '@mui/material';
import { Accordion, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

function FilterSectionAccordian(props) {
  const userScoreMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },

    {
      value: 10,
      label: '10',
    },
  ];
  const userVotesMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 200,
      label: '200',
    },
    {
      value: 300,
      label: '300',
    },
    {
      value: 400,
      label: '400',
    },
    {
      value: 500,
      label: '500',
    },
  ];
  const runTimeMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 120,
      label: '120',
    },
    {
      value: 240,
      label: '240',
    },
    {
      value: 360,
      label: '360',
    },
  ];
  const [userScore, setUserScore] = useState([0, 10]);
  const [runTime, setRunTime] = useState([0, 400]);

  const handleUserScoreChange = (event, newValue) => {
    setUserScore(newValue);
    props.setUrlParams({
      ...props.urlParams,
      'vote_average.gte': newValue[0],
      'vote_average.lte': newValue[1],
    });
  };

  const handleRunTimeChange = (event, newValue) => {
    setRunTime(newValue);
    props.setUrlParams({
      ...props.urlParams,
      'runtime.gte': newValue[0],
      'runtime.lte': newValue[1],
    });
  };

  // console.log(props);

  const [startDate, setStartDate] = useState(
    props.urlParams['air_date.gte'] ? props.urlParams['air_date.gte'] : ''
  );
  const [endDate, setEndDate] = useState(
    props.urlParams['air_date.lte'] ? props.urlParams['air_date.lte'] : ''
  );

  const [isAllEpisodes, setIsAllEpisodes] = useState(true);
  const [isFirstDate, setIsFirstDate] = useState(true);

  const toggleAllEpisodes = () => {
    setIsAllEpisodes(!isAllEpisodes);
  };

  const toggleFirstDate = () => {
    setIsFirstDate(!isFirstDate);
  };

  // useEffect(() => {
  //   isAllEpisodes
  //     ? props.setUrlParams({
  //         ...props.urlParams,
  //         'air_date.lte': endDate,
  //         'first_air_date.lte': '',
  //         'air_date.gte': startDate,
  //         'first_air_date.gte': '',
  //       })
  //     : props.setUrlParams({
  //         ...props.urlParams,
  //         'air_date.lte': '',
  //         'first_air_date.lte': endDate,
  //         'air_date.gte': '',
  //         'first_air_date.gte': startDate,
  //       });
  // }, [isAllEpisodes, endDate]);

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
          {props.showType === 'movie' ? (
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
                      <label
                        className='form-check-label'
                        htmlFor='exampleCheck1'
                      >
                        Search all countries?
                      </label>
                    </div>
                  </label>
                  {!props.isAllCountries && (
                    <div className='all_countries_wrapper'>
                      <Form>
                        <Dropdown
                          onSelect={(eventKey) => {
                            props.setUrlParams({
                              ...props.urlParams,
                              region: eventKey,
                            });
                          }}
                        >
                          <Dropdown.Toggle
                            variant='secondary'
                            id='dropdown-basic'
                          >
                            <span
                              style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                              }}
                            >
                              {props.urlParams.region && (
                                <img
                                  src={`https://raw.githubusercontent.com/SujalShah3234/All-Country-Flags/master/${props.urlParams.region}.png`}
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
                                  alt={props.urlParams.region}
                                />
                              )}
                              {props.urlParams.region
                                ? props.countriesList.find(
                                    (country) =>
                                      country.iso_3166_1 ===
                                      props.urlParams.region
                                  ).english_name
                                : 'Select Country'}
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {props.countriesList.map((country) => (
                              <Dropdown.Item
                                key={country.iso_3166_1}
                                eventKey={country.iso_3166_1}
                              >
                                <img
                                  src={`https://raw.githubusercontent.com/SujalShah3234/All-Country-Flags/master/${country.iso_3166_1}.png`}
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
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form>
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
                      dateFormat='MM/dd/yyyy'
                      selected={
                        props.urlParams['release_date.gte']
                          ? new Date(props.urlParams['release_date.gte'])
                          : ''
                      }
                      onChange={(date) => {
                        if (props.showType === 'movie') {
                          props.setUrlParams({
                            ...props.urlParams,
                            'release_date.gte': date
                              .toISOString()
                              .split('T')[0],
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
                      dateFormat='MM/dd/yyyy'
                      selected={
                        props.urlParams['release_date.lte']
                          ? new Date(props.urlParams['release_date.lte'])
                          : ''
                      }
                      onChange={(date) => {
                        if (props.showType === 'movie') {
                          props.setUrlParams({
                            ...props.urlParams,
                            'release_date.lte': date
                              .toISOString()
                              .split('T')[0],
                          });
                        }
                      }}
                    />
                  </span>
                </span>
              </div>
            </Accordion.Body>
          ) : (
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
                Air Dates
              </h3>
              <label className='release_type'>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='exampleCheck1'
                    onChange={toggleAllEpisodes}
                    checked={isAllEpisodes}
                  />
                  <label className='form-check-label' htmlFor='exampleCheck1'>
                    Search all episodes?
                  </label>
                </div>
              </label>
              {!isAllEpisodes && (
                <div className='release_type_wrapper d-flex flex-column'>
                  <label className='all_countries'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='exampleCheck1'
                        onChange={toggleFirstDate}
                        checked={isFirstDate}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='exampleCheck1'
                      >
                        Search first air date?
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
                      dateFormat='MM/dd/yyyy'
                      // selected={new Date(startDate)}
                      selected={
                        !isAllEpisodes
                          ? props.urlParams['first_air_date.gte'] !== ''
                            ? new Date(props.urlParams['first_air_date.gte'])
                            : ''
                          : props.urlParams['air_date.gte'] !== ''
                          ? new Date(props.urlParams['air_date.gte'])
                          : ''
                      }
                      onChange={(date) => {
                        // setStartDate(date.toISOString().split('T')[0]);
                        isAllEpisodes
                          ? props.setUrlParams({
                              ...props.urlParams,
                              'air_date.gte': date.toISOString().split('T')[0],
                              'first_air_date.gte': '',
                            })
                          : props.setUrlParams({
                              ...props.urlParams,
                              'air_date.gte': '',
                              'first_air_date.gte': date
                                .toISOString()
                                .split('T')[0],
                            });
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
                      dateFormat='MM/dd/yyyy'
                      // selected={new Date(endDate)}
                      selected={
                        !isAllEpisodes
                          ? props.urlParams['first_air_date.lte'] !== ''
                            ? new Date(props.urlParams['first_air_date.lte'])
                            : ''
                          : props.urlParams['air_date.lte'] !== ''
                          ? new Date(props.urlParams['air_date.lte'])
                          : ''
                      }
                      onChange={(date) => {
                        // setEndDate(date.toISOString().split('T')[0]);
                        isAllEpisodes
                          ? props.setUrlParams({
                              ...props.urlParams,
                              'air_date.lte': date.toISOString().split('T')[0],
                              'first_air_date.lte': '',
                            })
                          : props.setUrlParams({
                              ...props.urlParams,
                              'air_date.lte': '',
                              'first_air_date.lte': date
                                .toISOString()
                                .split('T')[0],
                            });
                      }}
                    />
                  </span>
                </span>
              </div>
            </Accordion.Body>
          )}
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
              User Score
            </h3>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={userScore}
              min={0}
              step={1}
              max={10}
              marks={userScoreMarks}
              onChange={handleUserScoreChange}
              valueLabelDisplay='auto'
            />
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
              Minimum User Votes
            </h3>

            <Slider
              defaultValue={0}
              marks={userVotesMarks}
              step={50}
              min={0}
              max={500}
              valueLabelDisplay='auto'
              onChange={(event, userVotes) => {
                props.setUrlParams({
                  ...props.urlParams,
                  'vote_count.gte': userVotes,
                });
              }}
            />
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
              Runtime
            </h3>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              defaultValue={0}
              value={runTime}
              min={0}
              step={15}
              max={400}
              marks={runTimeMarks}
              onChange={handleRunTimeChange}
              valueLabelDisplay='auto'
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FilterSectionAccordian;
