import { Link } from 'react-router-dom';

const Header = ({ movie, provider, type }) => {
  console.log(movie);
  console.log(provider);
  // provider.results.IN.buy && console.log(provider.results.IN.buy[0].logo_path);

  console.log(movie);
  let totalMinutes = movie.runtime || movie.episode_run_time[0];
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  let hoursString = hours > 0 ? hours + 'h ' : '';
  let minutesString = minutes > 0 ? minutes + 'm' : '';
  let runtime = hoursString + minutesString;

  let year;
  year = movie.release_date || movie.first_air_date.split('-')[0];
  let formattedyear;
  let release_date;
  let formattedmonth;
  let dt;

  if (type === 'movie') {
    release_date = movie.release_date;
    year = release_date.split('-')[0];

    let date = new Date(release_date);
    formattedyear = date.getFullYear();
    formattedmonth = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (formattedmonth < 10) {
      formattedmonth = '0' + formattedmonth;
    }
  }

  console.log(formattedyear + '/' + formattedmonth + '/' + dt);

  return (
    movie && (
      <div
        className='header w-100'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
        }}
      >
        <div
          className='background-effect d-flex justify-content-center flex-wrap'
          style={{
            background: `linear-gradient(to right, rgb(53, 32, 32) 150px, rgba(53, 32, 32, 0.84) 100%)`,
          }}
        >
          <div className='column w-100'>
            <section className='header-inner d-flex flex-nowrap'>
              <div className='poster-wrapper h-auto overflow-hidden'>
                <div className='poster'>
                  <div className='image-container w-100 h-100'>
                    {movie.poster_path ? (
                      <img
                        className='w-100 h-100'
                        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                        alt=''
                      />
                    ) : (
                      <div className='no-image'></div>
                    )}
                  </div>
                </div>
                {Object.keys(provider).length > 0 &&
                  Object.keys(provider.results).length > 0 &&
                  provider.results.IN && (
                    <div className='ott d-flex justify-content-center align-items-center'>
                      <div className='ott-wrapper d-flex align-items-stretch flex-wrap w-100'>
                        <div className='button d-flex justify-content-center w-100'>
                          <div className='provider d-flex align-content-center align-items-center'>
                            <img
                              src={
                                provider.results.IN.flatrate
                                  ? `https://www.themoviedb.org/t/p/original/${provider.results.IN.flatrate[0].logo_path}`
                                  : `https://www.themoviedb.org/t/p/original/${provider.results.IN.buy[0].logo_path}`
                              }
                              alt=''
                            />
                          </div>
                          <div className='text d-flex flex-wrap align-items-center align-content-center'>
                            <span>
                              <h4>
                                {provider.results.IN.flatrate
                                  ? 'Now Streaming'
                                  : 'Available to Rent or Buy'}
                              </h4>
                              <h3>Watch Now</h3>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className='details-wrapper d-flex'>
                <section className='details d-flex flex-wrap align-content-center align-items-start'>
                  <div className='title-wrapper w-100 d-flex flex-wrap'>
                    <h2 className='title m-0 p-0 w-100'>
                      <Link to='/movie/12'>
                        {movie.title || movie.name + ' '}
                      </Link>
                      <span className='release-date'>{'(' + year + ')'}</span>
                    </h2>
                    <div className='facts d-flex'>
                      {/* <span className='certifications align-items-center align-content-center'>
                        16
                      </span> */}
                      {type === 'movie' && (
                        <span className='release-date'>
                          {formattedmonth + '/' + dt + '/' + formattedyear}
                          {'('}
                          {
                            movie.production_countries[
                              movie.production_countries.length - 1
                            ].iso_3166_1
                          }
                          {')'}
                        </span>
                      )}
                      {movie.genres.length > 0 && (
                        <span className='genres'>
                          {movie.genres.map((genre, index) => {
                            return (
                              <span key={index}>
                                <Link to={'/genre/' + genre.id}>
                                  {genre.name}
                                </Link>
                                {index === movie.genres.length - 1 ? '' : ', '}
                              </span>
                            );
                          })}
                        </span>
                      )}
                      {runtime && <span className='runtime'>{runtime}</span>}
                    </div>
                  </div>
                  <ul className='action-list d-flex align-items-center justify-align-content-start list-unstyled'>
                    <li className='chart'>
                      <div className='rating'>{movie.vote_average * 10}%</div>
                      <div className='text'>
                        User <br />
                        Rating
                      </div>
                    </li>
                  </ul>
                  <div className='description'>
                    <h3 className='tagline'>
                      {movie.tagline && movie.tagline}
                    </h3>
                    <h3 className='auto'>Overview</h3>
                    <div className='overview'>
                      <p>{movie.overview}</p>
                    </div>

                    {movie.created_by && movie.created_by.length > 0 && (
                      <ol className='people no_image'>
                        {movie.created_by.map((person, index) => {
                          return (
                            <li key={index} className='profile'>
                              <p>
                                <a href='/person/2009739-domee-shi'>
                                  {person.name}
                                </a>
                              </p>
                              <p className='character'>Creator</p>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
