import { Link } from 'react-router-dom';
import './moviecard.scss';

const MovieCard = ({
  id,
  poster,
  title,
  date,
  rating,
  onMovieClick,
  activeTab,
}) => {
  console.log(activeTab);
  let detailsPath;
  switch (activeTab) {
    case 'On_TV':
      detailsPath = `/tv/${id}`;
      break;
    case 'In_Theaters':
      detailsPath = `/movie/${id}`;
      break;
    case 'Today':
      detailsPath = `/movie/${id}`;
      break;
    case 'This_Week':
      detailsPath = `/movie/${id}`;
      break;
    default:
      detailsPath = `/movie/${id}`;
      break;
  }

  return (
    <div className='card style_1'>
      <div className='card-image__wrapper' onClick={() => onMovieClick(id)}>
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
                <span className='icon-per'>{rating}%</span>
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

export default MovieCard;
