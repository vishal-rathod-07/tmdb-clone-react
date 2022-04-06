import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className='page-not-found container'>
      <div className='page-not-found__wrapper row p-3'>
        <div className='page-not-found__title col-12'>
          <h2>Oops! We can't find the page you're looking for</h2>
        </div>
        <div className='page-not-found__text col-12'>
          <p>
            You tried to request a page that doesn't exist. If you believe this
            to be in error, let us know <a href='/talk'>on the forums</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
