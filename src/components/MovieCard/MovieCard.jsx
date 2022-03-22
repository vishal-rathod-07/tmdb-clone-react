import './moviecard.scss';

const MovieCard = ({ id, poster, title, date, rating, onMovieClick }) => {
  return (
    <div className='card style_1'>
      <div className='card-image__wrapper' onClick={() => onMovieClick(id)}>
        <div className='card__image'>
          <a className='image-link'>
            {poster ? (
              <img
                loading='lazy'
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={title}
              />
            ) : (
              <div className='no-image'></div>
            )}
          </a>
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
          <a href={`/movie/${id}`} title={title}>
            {title}
          </a>
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
