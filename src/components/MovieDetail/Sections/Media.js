const Media = () => {
  return (
    <div className='media'>
      <div className='column-wrapper'>
        <div className='content-wrapper'>
          <div className='content-left'>
            <div className='column'>
              <section className='top-billed-cast'>
                <h3 dir='auto'>Top Billed Cast</h3>
                <div className='cast-scroller'>
                  <ol className='cast-list'>
                    <li className='cast-item'></li>
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
