import { Link } from 'react-router-dom';

const Media = ({ movie, cast, keywords, reviews, recommandations, type }) => {
  console.log(reviews);
  console.log('rec');
  console.log(recommandations);
  console.log('type');
  console.log(keywords);
  const reviewLength = reviews.length;
  reviews.length > 0 &&
    (reviews = reviews[Math.floor(Math.random() * reviews.length)]);
  // const review = reviews[reviews.length - 1];
  return (
    <div className='media d-flex justify-content-center flex-wrap align-align-items-start w-100'>
      <div className='column-wrapper w-100 d-flex justify-content-center align-items-start'>
        <div className='content-wrapper w-100 d-flex align-items-start justify-content-center'>
          <div className='content-left'>
            <div className='column d-flex flex-wrap'>
              <section className='top-billed-cast w-100'>
                <h3 dir='auto'>Top Billed Cast</h3>
                <div className='cast-scroller'>
                  <ol className='cast-list d-flex'>
                    {cast &&
                      cast.map((cast, index) => {
                        return (
                          <li key={index} className='cast-item card'>
                            <div className='card-img-top w-100'>
                              {cast.profile_path ? (
                                <img
                                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
                                  alt='Cast 1'
                                  loading='lazy'
                                />
                              ) : (
                                <img
                                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                  alt='Cast 1'
                                  loading='lazy'
                                />
                              )}
                            </div>
                            <div className='card-body'>
                              <h4 className='card-title'>{cast.name}</h4>
                              <p className='card-text'>{cast.character}</p>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </section>
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
                                  src={reviews.author_details.avatar_path.substring(
                                    1
                                  )}
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
                                  <span className='rating-value'>
                                    {reviews.author_details.rating}
                                  </span>
                                </div>
                              </div>
                              <h5>
                                Written by &nbsp;
                                <Link
                                  to={`/u/${reviews.author_details.username}`}
                                >
                                  {reviews.author_details.name}
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
                            <p>{reviews.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='content d-flex w-100'>
                      <div className='content-inner d-flex flex-wrap align-items-center w-100'>
                        <p>
                          We don't have any reviews for {movie.title}. Would you
                          like to write one?
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </section>
              <section className='recommandations w-100 d-block pb-0'>
                <div className='wrapper'>
                  <h3>Recommandations</h3>
                  <div className='recommandations-wrapper'>
                    <div className='recommandations-list'>
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
                                    <img
                                      src={`https://image.tmdb.org/t/p/w250_and_h141_face/${recommandation.backdrop_path}`}
                                      alt='Recommandation 1'
                                      loading='lazy'
                                    />
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
                                  {recommandation.title || recommandation.name}
                                </Link>
                                <span className='rating'>
                                  {Math.floor(recommandation.vote_average * 10)}
                                  %
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
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
                            {movie.networks.length !== 0 &&
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
                              })}
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
                        {movie.spoken_languages[0].english_name};&nbsp;
                      </p>
                      {type === 'movie' && (
                        <>
                          <p>
                            <strong>Budget</strong> {movie.budget}
                          </p>
                          <p>
                            <strong>Revenue</strong> {movie.revenue}
                          </p>
                        </>
                      )}
                    </section>
                    <section className='keywords w-100'>
                      <h4>keywords</h4>
                      <ul className='w-100 d-flex flex-wrap justify-content-start list-unstyled'>
                        {keywords ? (
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
