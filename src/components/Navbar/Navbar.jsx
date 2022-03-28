import './navbar.scss';
import { LOGO_URL } from '../Constants';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    document.addEventListener('scroll', () => handleScroll());

    return () => {
      document.removeEventListener('scroll', () => handleScroll());
    };
  }, []);

  const [isNavbarFixed, setIsNavbarFixed] = useState(true);
  let lastScrollTop = 0;
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop < lastScrollTop) {
      setIsNavbarFixed(true);
    } else {
      setIsNavbarFixed(false);
    }
    lastScrollTop = scrollTop;
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
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='#'>
                  Movies
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  TV Shows
                </a>
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
