import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='wrapper'>
        <div className='wrapper_inner'>
          <div className='footer__column'>
            <div className='row header'>
              <h2>Join Today</h2>
            </div>
            <div className='row content p-0'>
              <div className='col-7'>
                <p>
                  Get access to maintain your own <em>custom personal lists</em>
                  , <em>track what you've seen</em> and search and filter for{' '}
                  <em>what to watch next</em>—regardless if it's in theatres, on
                  TV or available on popular streaming services like Netflix,
                  Hotstar, and Amazon Prime Video.
                </p>
                <p className='button'>
                  <a
                    href='/signup'
                    className='rounded background_color border_color purple btn'
                  >
                    Sign Up
                  </a>
                </p>
              </div>
              <div className='col-5'>
                <ul>
                  <li>Enjoy TMDB ad free</li>
                  <li>Maintain a personal watchlist</li>
                  <li>
                    Filter by your subscribed streaming services and find
                    something to watch
                  </li>
                  <li>Log the movies and TV shows you've seen</li>
                  <li>Build custom lists</li>
                  <li>Contribute to and improve our database</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
