import MovieCard from '../MovieCard/MovieCard';
import Tabs from '../Tabs/Tabs';

import './cardsection.scss';

const CardSection = ({
  sectionType,
  tabs,
  activeTab,
  setActiveTab,
  movies,
  cardVisiblity,
  setCardVisiblity,
}) => {
  // console.log(movies);
  const onTabClick = (id) => {
    // console.log(id);
    setCardVisiblity(!cardVisiblity);
    setActiveTab(id);
  };

  const onMovieClick = (id) => {
    // console.log(id);
  };

  return (
    <section
      className={
        sectionType === 'trending'
          ? 'card-section trending row m-0 w-100'
          : 'card-section row m-0'
      }
    >
      <div className='card-section__column_wrapper p-0'>
        <div className='card-section__content_wrapper pb-0 mb-0'>
          <div className='card-section__column'>
            <div className='card-section__column_header'>
              <h2 className='card-section__column_title my-0'>
                {sectionType === 'popular' ? `What's Popular` : `Trending`}
              </h2>
              <Tabs tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
            </div>
            <div className='card-section__column_scroller'>
              <div
                className='scroller_inner loaded'
                onScroll={(e) => {
                  const element = e.target;
                  if (element.scrollLeft > 25) {
                    element.style.setProperty('--opacity', 0);
                  } else {
                    element.style.setProperty('--opacity', 1);
                  }
                }}
              >
                {movies.map((movie, index) => (
                  <MovieCard
                    key={index}
                    id={movie.id}
                    poster={movie.poster_path}
                    title={movie.name ?? movie.title}
                    date={movie.first_air_date ?? movie.release_date}
                    rating={movie.vote_average * 10}
                    onMovieClick={onMovieClick}
                    activeTab={activeTab}
                    movie={movie}
                    cardVisiblity={cardVisiblity}
                  />
                ))}
                <div className='spacer'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
