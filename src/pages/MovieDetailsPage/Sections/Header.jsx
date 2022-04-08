import { Circle } from 'rc-progress';
import { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import { Link } from 'react-router-dom';
import FormatDate from '../../../components/util/FormatDate';
import VideoModel from '../../../components/VideoModel/VideoModel';

function PosterSection(props) {
  return (
    <div className='poster-wrapper h-auto overflow-hidden'>
      <div className='poster'>
        <div className='image-container w-100 h-100'>
          {props.movie.poster_path ? (
            <ColorExtractor
              rgb
              getColors={(colors) => {
                props.setBackDropStyles({
                  background: `linear-gradient(to right, rgb(${colors[5][0]}, ${colors[5][1]}, ${colors[5][2]}) 150px, rgba(${colors[2][0]}, ${colors[2][0]}, ${colors[2][0]}, 0.84) 100%)`,
                  color: `#fff`,
                });
              }}
            >
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.movie.poster_path}`}
                alt=''
              />
            </ColorExtractor>
          ) : (
            <div className='no-image'></div>
          )}
        </div>
      </div>
      {props.length > 0 && Object.keys(props.results).length > 0 && props.IN && (
        <div className='ott d-flex justify-content-center align-items-center'>
          <div className='ott-wrapper d-flex align-items-stretch flex-wrap w-100'>
            <div className='button d-flex justify-content-center w-100'>
              <div className='provider d-flex align-content-center align-items-center'>
                <img
                  src={
                    props.IN.flatrate
                      ? `https://www.themoviedb.org/t/p/original/${props.IN.flatrate[0].logo_path}`
                      : `https://www.themoviedb.org/t/p/original/${props.IN.buy[0].logo_path}`
                  }
                  alt=''
                />
              </div>
              <div className='text d-flex flex-wrap align-items-center align-content-center'>
                <span>
                  <h4>
                    {props.IN.flatrate
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
  );
}

function DetailsSection(props) {
  return (
    <div className='details-wrapper d-flex mt-4 m-md-0'>
      <section className='details d-flex flex-wrap align-content-center align-items-start'>
        <div className='title-wrapper w-100 d-flex flex-wrap'>
          <h2 className='title m-0 p-0 w-100'>
            <Link to='/movie/12'>
              {props.movie.title ?? props.movie.name + ' '}
            </Link>

            {props.year && (
              <span className='release-date'>{' (' + props.year + ')'}</span>
            )}
          </h2>

          <div className='facts d-flex flex-column flex-md-row'>
            {props.certificate && (
              <span className='certifications'>{props.certificate}</span>
            )}
            {props.type === 'movie' && (
              <span className='release-date'>
                <FormatDate date={props.movie.release_date} />
                {props.movie.production_countries.iso_3166_1 &&
                  `(${
                    props.movie.production_countries[
                      props.movie.production_countries.length - 1
                    ].iso_3166_1
                  })`}
              </span>
            )}
            {props.movie.genres.length > 0 && (
              <span className='genres'>
                {props.movie.genres.map((genre, index) => {
                  return (
                    <span key={index}>
                      <Link to={'/genre/' + genre.id}>{genre.name}</Link>
                      {index === props.movie.genres.length - 1 ? '' : ', '}
                    </span>
                  );
                })}
              </span>
            )}
            {props.runtime && <span className='runtime'>{props.runtime}</span>}
          </div>
        </div>
        <ul className='action-list d-flex align-items-center justify-align-content-start list-unstyled'>
          <li className='chart'>
            <div className='rating'>
              <Circle
                percent={props.movie.vote_average * 10}
                strokeWidth='6'
                trailWidth='7'
                text={props.movie.vote_average}
                trailColor={
                  props.movie.vote_average >= 7
                    ? '#204529'
                    : props.movie.vote_average >= 4
                    ? '#423d0f'
                    : props.movie.vote_average !== 0
                    ? '#571435'
                    : '#666'
                }
                strokeColor={
                  props.movie.vote_average >= 7
                    ? '#21d07a'
                    : props.movie.vote_average >= 4
                    ? '#d2d531'
                    : '#db2360'
                }
              />

              <span
                className={`rating-text icon-r${props.movie.vote_average * 10}`}
              ></span>
            </div>
            <div className='text fw-bold'>
              User <br />
              Score
            </div>
          </li>

          {props.trailerKey && (
            <li>
              <Link
                to=''
                className='play_trailer'
                onClick={() => props.setVideoModalShow(true)}
              >
                <span className='play-icon'></span>
                Play Trailer
              </Link>
            </li>
          )}

          <VideoModel
            show={props.videoModalShow}
            onHide={() => props.setVideoModalShow(false)}
            trailerKey={props.trailerKey}
          />
        </ul>
        <div className='description'>
          <h3 className='tagline'>
            {props.movie.tagline && props.movie.tagline}
          </h3>
          <h3 className='auto'>Overview</h3>
          <div className='overview'>
            <p>
              {props.movie.overview
                ? props.movie.overview
                : `We don't have an overview translated in English. Help us expand our database by adding one.`}
            </p>
          </div>

          {props.movie.created_by && props.movie.created_by.length > 0 && (
            <ol className='people no_image'>
              {props.movie.created_by.map((person, index) => {
                return (
                  <li key={index} className='profile'>
                    <p>
                      <Link to={`/person/${person.id}`}>{person.name}</Link>
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
  );
}

const Header = ({ movie, provider, type, trailerKey, certificate }) => {
  const [videoModalShow, setVideoModalShow] = useState(false);

  const [backDropStyles, setBackDropStyles] = useState({
    background: `linear-gradient(to right, rgba(227, 227, 227, 1) 150px, rgba(227, 227, 227, 0.84) 100%)`,
    color: `#000`,
  });

  let totalMinutes = movie.runtime ?? movie.episode_run_time[0];
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  let hoursString = hours > 0 ? hours + 'h ' : '';
  let minutesString = minutes > 0 ? minutes + 'm' : '';
  let runtime = hoursString + minutesString;

  let year =
    (movie.release_date && movie.release_date.split('-')[0]) ||
    (movie.first_air_date && movie.first_air_date.split('-')[0]);

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
          style={backDropStyles}
        >
          <div className='column w-100'>
            <section className='header-inner d-flex flex-column flex-md-row flex-nowrap justify-content-center align-items-center'>
              <PosterSection
                setBackDropStyles={setBackDropStyles}
                movie={movie}
                length={Object.keys(provider).length}
                results={provider.results}
                IN={provider.results.IN}
              ></PosterSection>
              <DetailsSection
                videoModalShow={videoModalShow}
                setVideoModalShow={setVideoModalShow}
                runtime={runtime}
                year={year}
                movie={movie}
                type={type}
                trailerKey={trailerKey}
                certificate={certificate}
              ></DetailsSection>
            </section>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
