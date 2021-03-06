import { Link } from 'react-router-dom';
import './filtermoviecard.scss';
import { Circle } from 'rc-progress';
import '../MovieCard/ratingicons.scss';

const FilterMovieCard = ({
  id,
  poster,
  title,
  date,
  rating,
  showType,
  movie,
}) => {
  movie.media_type && (movie.media_type = movie.media_type.toLowerCase());
  let detailsPath;
  switch (showType) {
    case 'tv':
      detailsPath = `/tv/${id}`;
      break;
    default:
      detailsPath = `/movie/${id}`;
      break;
  }

  return (
    <div className='F-M-card style_1'>
      <div className='card-image__wrapper'>
        <div className='card__image'>
          <Link className='image-link' to={detailsPath}>
            {poster ? (
              <img
                loading='lazy'
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={title}
              />
            ) : (
              <div className='no-image'></div>
            )}
          </Link>
        </div>
        <div className='card-options'></div>
      </div>
      <div className='card-content w-100'>
        <div className='card-content_rankings'>
          <div className='ring'>
            <div className='ring-inner'>
              <div className='percent'>
                <Circle
                  percent={movie.vote_average * 10}
                  strokeWidth='6'
                  trailWidth='7'
                  text={movie.vote_average}
                  trailColor={
                    movie.vote_average >= 7
                      ? '#204529'
                      : movie.vote_average >= 4
                      ? '#423d0f'
                      : movie.vote_average !== 0
                      ? '#571435'
                      : '#666'
                  }
                  strokeColor={
                    movie.vote_average >= 7
                      ? '#21d07a'
                      : movie.vote_average >= 4
                      ? '#d2d531'
                      : '#db2360'
                  }
                />
                <span
                  className={`rating-text icon-r${
                    movie.vote_average * 10 !== 0
                      ? movie.vote_average * 10
                      : 'NR'
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <h2 className='m-0'>
          <Link to={detailsPath}>{title}</Link>
        </h2>
        <p>
          {new Date(date).toLocaleString('en-US', {
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'short', // numeric, 2-digit, long, short, narrow
          })}
        </p>
      </div>
    </div>
  );
};

export default FilterMovieCard;
