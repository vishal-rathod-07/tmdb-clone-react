import './navbar.scss';
import { LOGO_URL } from '../Constants';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    document.addEventListener('scroll', () => hasScrolled());

    return () => {
      document.removeEventListener('scroll', () => hasScrolled());
    };
  }, []);

  const [isNavbarFixed, setIsNavbarFixed] = useState(true);

  let lastScrollTop = 0;
  var delta = 10;
  // var navbarHeight = document.querySelector('.navbar').offsetHeight;
  var navbarHeight = 64;
  // console.log(navbarHeight);

  const hasScrolled = () => {
    var st = window.pageYOffset;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    } else {
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        setIsNavbarFixed(false);
      } else {
        // Scroll Up
        if (st + window.innerHeight < document.body.scrollHeight) {
          setIsNavbarFixed(true);
        }
      }
    }

    lastScrollTop = st;
  };

  return (
    <header
      className={
        isNavbarFixed
          ? 'navbar autohide container-fluid navbar-main d-flex align-items-center scrolled-up sticky-top'
          : 'navbar autohide container-fluid navbar-main d-flex align-items-center scrolled-down sticky-top'
      }
    >
      <nav className='container navbar navbar-expand-lg navbar-light'>
        <div className='container-fluid navbar-inner'>
          <Link to='/' className='navbar-brand'>
            <img
              src={LOGO_URL}
              alt='The Movie Database (TMDB)'
              width='154'
              height='20'
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='mtooltip nav-item'>
                <Link to='/movie/category/popular' className='nav-link'>
                  Movies
                </Link>
                <div className='tooltipMenu bottomSide'>
                  <ul className=' list-unstyled'>
                    <li>
                      <Link to='/movie/category/popular'>Popular</Link>
                    </li>
                    <li>
                      <Link to='/movie/category/now_playing'>Now Playing</Link>
                    </li>
                    <li>
                      <Link to='/movie/category/upcoming'>Upcoming</Link>
                    </li>
                    <li>
                      <Link to='/movie/category/top_rated'>Top Rated</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className='mtooltip nav-item'>
                <Link to='/tv' className='nav-link'>
                  TV Shows
                </Link>
                <div className='tooltipMenu bottomSide'>
                  <ul className=' list-unstyled'>
                    <li>
                      <Link to='/tv'>Popular</Link>
                    </li>
                    <li>
                      <Link to='/tv/airing-today'>Airing Today</Link>
                    </li>
                    <li>
                      <Link to='/tv/on-the-air'>On TV</Link>
                    </li>
                    <li>
                      <Link to='/tv/top-rated'>Top Rated</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className='nav-right'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>
                    Login
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Join TMDB
                  </a>
                </li>
              </ul>

              {/* <div className='notification-icon'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-441-bell-9cd2af257b98c4af3460078777d8e38a5e12bca89704eeac2f39273afcbd06ff.svg'
                  alt='bell'
                />
              </div>
              <div className='user-avatar'>
                <img
                  src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                  className='rounded-circle'
                />
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
