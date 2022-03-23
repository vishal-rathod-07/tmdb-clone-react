const Media = ({ cast }) => {
  console.log(cast);
  return (
    <div className='media d-flex justify-content-center flex-wrap align-align-items-start w-100'>
      <div className='column-wrapper w-100 d-flex justify-content-center align-items-start'>
        <div className='content-wrapper w-100 d-flex align-items-start'>
          <div className='content-left'>
            <div className='column d-flex flex-wrap'>
              <section className='top-billed-cast w-100'>
                <h3 dir='auto'>Top Billed Cast</h3>
                <div className='cast-scroller'>
                  <ol className='cast-list d-flex'>
                    {cast.map((cast, index) => {
                      return (
                        <li key={index} className='cast-item card'>
                          <div className='card-img-top w-100'>
                            <img
                              src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
                              alt='Cast 1'
                              loading='lazy'
                            />
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
            </div>
          </div>
          <div className='content-right'>right</div>
        </div>
      </div>
    </div>
  );
};

export default Media;
