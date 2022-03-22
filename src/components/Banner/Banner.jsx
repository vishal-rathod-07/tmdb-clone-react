import './banner.scss';

const Banner = () => {
  return (
    <section className='hero-section row'>
      <div className='hero-section__wrapper h-100 d-flex align-content-center align-items-center justify-content-center p-0'>
        <div className='hero-section__column col-12 w-100 d-flex justify-content-center align-items-center align-content-start'>
          <div className='hero-section__content flex-wrap w-100'>
            <div className='hero-section__title w-100'>
              <h2>Welcome.</h2>
              <h3>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </h3>
            </div>
            <div className='hero-section__search w-100'>
              <form
                id='inner_search_form'
                action='/search'
                method='get'
                acceptCharset='utf-8'
              >
                <label className='w-100'>
                  <input
                    dir='auto'
                    id='inner_search_v4'
                    name='query'
                    type='text'
                    tabIndex='1'
                    autoCorrect='off'
                    autofill='off'
                    autoComplete='off'
                    spellCheck='false'
                    placeholder='Search for a movie, tv show, person......'
                    defaultValue=''
                  />
                </label>
                <input type='submit' value='Search' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
