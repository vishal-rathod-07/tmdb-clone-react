import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='wrapper'>
        <div className='wrapper_inner'>
          <div className='footer__column'>
            <div className='row header m-0'>
              <h2 className='m-0 p-0'>Join Today</h2>
            </div>
            <div className='row content m-0'>
              <div className='fc1 col-12 col-xl-7 p-0'>
                <p>
                  Get access to maintain your own <em>custom personal lists</em>
                  , <em>track what you've seen</em> and search and filter for{' '}
                  <em>what to watch next</em>—regardless if it's in theatres, on
                  TV or available on popular streaming services like Netflix,
                  Hotstar, and Amazon Prime Video.
                </p>
                <p className='button m-0'>
                  <Link
                    to='/signup'
                    className='rounded background_color border_color purple btn'
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className='fc2 col-12 col-xl-5 p-0'>
                <ul className='p-0'>
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
