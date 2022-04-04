import { Link } from 'react-router-dom';
import FormatDate from '../../FormatDate';

const Media = ({ movie, cast, keywords, reviews, recommandations, type }) => {
  // console.log(reviews);
  // console.log('rec');
  // console.log(recommandations);
  // console.log('type');
  console.log(cast);
  const reviewLength = reviews.length;
  reviews.length > 0 &&
    (reviews = reviews[Math.floor(Math.random() * reviews.length)]);
  let date;
  type === 'tv' &&
    (date = new Date(movie.seasons[movie.seasons.length - 1].air_date));
  // const review = reviews[reviews.length - 1];
  return (
    <div className='media d-flex justify-content-center flex-wrap align-align-items-start w-100'>
      <div className='column-wrapper w-100 d-flex justify-content-center align-items-start'>
        <div className='content-wrapper w-100 d-flex align-items-start justify-content-center'>
          <div className='content-left'>
            <div className='column d-flex flex-wrap'>
              <section className='top-billed-cast w-100'>
                <h3 dir='auto'>
                  {type === 'tv' ? 'Series Cast' : 'Top Billed Cast'}
                </h3>
                {cast.length > 0 ? (
                  <div className='cast-scroller'>
                    <ol
                      className='cast-list d-flex'
                      onScroll={(e) => {
                        const element = e.target;
                        if (element.scrollLeft > 25) {
                          element.style.setProperty('--opacity', 0);
                        } else {
                          element.style.setProperty('--opacity', 1);
                        }
                      }}
                    >
                      {cast &&
                        //map through the cast array and return the nine cast members

                        cast.slice(0, 9).map((cast, index) => {
                          return (
                            <li key={index} className='cast-item card'>
                              <div className='card-img-top w-100'>
                                {cast.profile_path ? (
                                  <img
                                    src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
                                    alt='Cast 1'
                                    loading='lazy'
                                  />
                                ) : cast.gender === 1 ? (
                                  <div className='no-image female'></div>
                                ) : (
                                  <div className='no-image male'></div>
                                )}
                              </div>
                              <div className='card-body'>
                                <h4 className='card-title m-0'>{cast.name}</h4>
                                <p className='card-text'>{cast.character}</p>
                              </div>
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                ) : (
                  <div className='cast-scroller'>
                    We don't have any cast added to this TV Show. You can help
                    by adding some!
                  </div>
                )}
              </section>
              {type === 'tv' && (
                <section className='season w-100 d-block'>
                  <div className='heading d-flex'>
                    <h3 dir='auto'>
                      {
                        //last season or current season
                        movie.next_episode_to_air === null
                          ? 'Last Season'
                          : 'Current Season'
                      }
                    </h3>
                  </div>
                  <div className='card overflow-hidden d-flex flex-wrap'>
                    <div className='d-flex'>
                      <Link
                        className='poster'
                        to={`/tv/${movie.id}/season/${movie.number_of_seasons}`}
                      >
                        {movie.poster_path !== null ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w130_and_h195_bestv2/${movie.poster_path}`}
                            alt='Poster'
                            loading='lazy'
                          />
                        ) : (
                          <div className='no-image'></div>
                        )}
                      </Link>

                      <div className='content'>
                        <div>
                          <h2>
                            <a href='/tv/52814-halo/season/1'>
                              {movie.seasons[movie.seasons.length - 1].name}
                            </a>
                          </h2>
                          <h4>
                            {movie.seasons[movie.seasons.length - 1]
                              .air_date !== null &&
                              movie.seasons[
                                movie.seasons.length - 1
                              ].air_date.split('-')[0]}{' '}
                            |{' '}
                            {
                              movie.seasons[movie.seasons.length - 1]
                                .episode_count
                            }{' '}
                            episodes
                          </h4>
                          <div className='season_overview'>
                            <p>
                              {movie.seasons[movie.number_of_seasons - 1]
                                .overview !== ''
                                ? `${
                                    movie.seasons[movie.seasons.length - 1]
                                      .overview
                                  }`
                                : `season ${movie.number_of_seasons} of ${
                                    movie.name
                                  } premiered on 
                                ${date.toLocaleString('en-US', {
                                  day: 'numeric', // numeric, 2-digit
                                  year: 'numeric', // numeric, 2-digit
                                  month: 'short', // numeric, 2-digit, long, short, narrow
                                })}.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='button d-inline-block'>
                    <Link to={`/tv/${movie.id}/seasons`}>View All Seasons</Link>
                  </p>
                </section>
              )}
              <section className='media-pannel w-100 d-block'>
                <section className='review'>
                  <div className='menu d-flex w-100 align-items-baseline'>
                    <h3 className=' d-inline-block'>Social</h3>
                    <ul className='menu-list'>
                      <li className='menu-item active'>
                        <Link to={`/movie/${movie.id}/reviews`}>
                          <span>Reviews</span>
                          <span className='text-secondary'>
                            {' '}
                            {reviewLength}
                          </span>
                        </Link>
                      </li>
                      <li className='menu-item'>
                        <a href='#'>
                          <span>Discussions</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {reviews.length !== 0 ? (
                    <div className='content d-flex w-100'>
                      <div className='content-inner d-flex flex-wrap align-items-center w-100'>
                        <div className='card w-100'>
                          <div className='user-info w-100 d-flex align-items-center align-content-center'>
                            <div className='user-img'>
                              {reviews.author_details.avatar_path ? (
                                <img
                                  src={
                                    reviews.author_details.avatar_path.startsWith(
                                      '/https'
                                    )
                                      ? reviews.author_details.avatar_path.substring(
                                          1
                                        )
                                      : `https://www.themoviedb.org/t/p/w64_and_h64_face/${reviews.author_details.avatar_path}`
                                  }
                                  alt='User 1'
                                  loading='lazy'
                                />
                              ) : (
                                <img
                                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                  alt='User 1'
                                  loading='lazy'
                                />
                              )}
                            </div>
                            <div className='user-info-wrapper w-100'>
                              <div className='rating-wrapper w-100 d-flex flex-wrap align-items-baseline justify-content-start'>
                                <h3>
                                  <Link to={`/review/${reviews.id}`}>
                                    A review by {reviews.author}
                                  </Link>
                                </h3>
                                <div className='rating'>
                                  <span className='rating-value'></span>
                                  {reviews.author_details.rating}.0
                                </div>
                              </div>
                              <h5>
                                Written by &nbsp;
                                <Link to={`/u/${reviews.author}`}>
                                  <strong>{reviews.author}</strong>
                                </Link>
                                &nbsp; on &nbsp;
                                {new Date(reviews.created_at).toLocaleString(
                                  'en-US',
                                  {
                                    day: 'numeric', // numeric, 2-digit
                                    year: 'numeric', // numeric, 2-digit
                                    month: 'short', // numeric, 2-digit, long, short, narrow
                                  }
                                )}
                              </h5>
                            </div>
                          </div>
                          <div className='user-review'>
                            <p>
                              {reviews.content.length > 600
                                ? `${reviews.content.substring(0, 600)}...`
                                : reviews.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='content d-flex w-100'>
                      <div className='content-inner d-flex flex-wrap align-items-center w-100'>
                        <p>
                          We don't have any reviews for{' '}
                          {movie.title ?? movie.name}. Would you like to write
                          one?
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </section>
              <section className='recommandations w-100 d-block pb-0'>
                <div className='wrapper'>
                  <h3>Recommandations</h3>
                  {recommandations.length !== 0 ? (
                    <div className='recommandations-wrapper'>
                      <div
                        className='recommandations-list'
                        onScroll={(e) => {
                          const element = e.target;
                          if (element.scrollLeft > 25) {
                            element.style.setProperty('--opacity', 0);
                          } else {
                            element.style.setProperty('--opacity', 1);
                          }
                        }}
                      >
                        {recommandations &&
                          recommandations.map((recommandation, index) => {
                            return (
                              <div
                                key={index}
                                className='recommandation-item card d-inline-block float-none'
                              >
                                <div className='image'>
                                  <Link
                                    to={
                                      recommandation.media_type === 'movie'
                                        ? `/movie/${recommandation.id}`
                                        : `/tv/${recommandation.id}`
                                    }
                                  >
                                    {recommandation.backdrop_path !== null ? (
                                      <>
                                        <img
                                          src={`https://image.tmdb.org/t/p/w250_and_h141_face/${recommandation.backdrop_path}`}
                                          alt='Recommandation 1'
                                          loading='lazy'
                                        />
                                        <div className='hover_overlay'>
                                          <span className='release_date'>
                                            <span className='calender_icon'></span>
                                            {type === 'movie' ? (
                                              <FormatDate
                                                date={
                                                  recommandation.release_date
                                                }
                                              />
                                            ) : (
                                              <FormatDate
                                                date={
                                                  recommandation.first_air_date
                                                }
                                              />
                                            )}
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <div className='no-image' />
                                    )}
                                  </Link>
                                </div>
                                <div className='movie d-flex justify-content-between'>
                                  <Link
                                    to={
                                      recommandation.media_type === 'movie'
                                        ? `/movie/${recommandation.id}`
                                        : `/tv/${recommandation.id}`
                                    }
                                  >
                                    {recommandation.title ||
                                      recommandation.name}
                                  </Link>
                                  <span className='rating'>
                                    {Math.floor(
                                      recommandation.vote_average * 10
                                    )}
                                    %
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : type === 'tv' ? (
                    <div className='recommandations-wrapper'>
                      {`We don't have enough data to suggest any TV shows based on
                      ${movie.name}. You can help by rating TV shows you've seen.`}
                    </div>
                  ) : (
                    <div className='recommandations-wrapper'>
                      {`We don't have enough data to suggest any movies based on
                      ${movie.title}. You can help by rating movies you've seen.`}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
          <div className='content-right d-flex flex-wrap'>
            <div>
              <section className='column d-flex flex-wrap w-100'>
                <div className='w-100'>
                  <div className='w-100 pb-0 mb-0'>
                    <section className='facts w-100'>
                      <div className='social-links d-flex'></div>
                      {type === 'tv' && (
                        <p>
                          <strong>Facts</strong>
                        </p>
                      )}
                      <p>
                        <strong>Status</strong> {movie.status}
                      </p>
                      {type === 'tv' && (
                        <>
                          <p>
                            <strong>Network</strong>{' '}
                            {movie.networks.length !== 0 ? (
                              movie.networks.map((network, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={`https://www.themoviedb.org/t/p/h30/${network.logo_path}`}
                                    alt='Network'
                                    loading='lazy'
                                    style={{
                                      padding: '5px 0',
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <span>-</span>
                            )}
                            {/* <img
                              src={`https://www.themoviedb.org/t/p/h30/${movie.networks[0].logo_path}`}
                              alt='Network'
                              loading='lazy'
                            /> */}
                          </p>
                          <p>
                            <strong>Type</strong>
                            {movie.type}
                          </p>
                        </>
                      )}
                      <p>
                        <strong>Original Language</strong>
                        {new Intl.DisplayNames(['en'], { type: 'language' }).of(
                          movie.original_language
                        )}
                        &nbsp;
                      </p>
                      {type === 'movie' && (
                        <>
                          <p>
                            <strong>Budget</strong>
                            {movie.budget > 0
                              ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                }).format(movie.budget)
                              : '-'}
                          </p>
                          <p>
                            <strong>Revenue</strong>{' '}
                            {movie.revenue > 0
                              ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                }).format(movie.revenue)
                              : '-'}
                          </p>
                        </>
                      )}
                    </section>
                    <section className='keywords w-100'>
                      <h4>keywords</h4>
                      <ul className='w-100 d-flex flex-wrap justify-content-start list-unstyled mb-0'>
                        {keywords.length > 0 ? (
                          keywords.map((keyword, index) => {
                            return (
                              <li key={index}>
                                <Link to={`/search/${keyword.name}`}>
                                  {keyword.name}
                                </Link>
                              </li>
                            );
                          })
                        ) : (
                          <li>No keywords have been added.</li>
                        )}
                      </ul>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
