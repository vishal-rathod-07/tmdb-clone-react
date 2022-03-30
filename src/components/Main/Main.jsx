import { useEffect, useState } from 'react';

import Banner from '../Banner/Banner';
import CardSection from '../CardSection/CardSection';
import * as url from '../Constants';
import { popularTabs, trendingTabs } from '../TabList';
import LoadingBar from 'react-top-loading-bar';

import './main.scss';

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [activePopularTab, setActivePopularTab] = useState(popularTabs[0].id);
  const [activeTrendingTab, setActiveTrendingTab] = useState(
    trendingTabs[0].id
  );

  const [progress, setProgress] = useState(10); //Progress bar

  const [cardVisiblity, setCardVisiblity] = useState(false); //Card visibility

  const POPULAR_URL =
    activePopularTab === 'On_TV' ? url.POPULAR_ON_TV : url.POPULAR_IN_THEATERS;

  const TRENDING_URL =
    activeTrendingTab === 'Today' ? url.TRENDING_TODAY : url.TRENDING_THIS_WEEK;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(POPULAR_URL);
      const data = await response.json();
      setPopularMovies(data.results);
      setProgress(55);
      setCardVisiblity(true);
    } catch (error) {
      console.error(error);
    }
  };
  const getTrendingMovies = async () => {
    try {
      const response = await fetch(TRENDING_URL);
      const data = await response.json();
      setTrendingMovies(data.results);
      setProgress(100);
      setCardVisiblity(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
  }, [activePopularTab, activeTrendingTab]);

  return (
    <div className='container main p-0 d-flex flex-column'>
      <LoadingBar
        color='#01b4e4'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={true}
        height={4}
        transitionTime={400}
      />
      <Banner />
      {popularMovies && (
        <CardSection
          sectionType={'popular'}
          tabs={popularTabs}
          activeTab={activePopularTab}
          setActiveTab={setActivePopularTab}
          url={url.POPULAR_ON_TV}
          movies={popularMovies}
          cardVisiblity={cardVisiblity}
          setCardVisiblity={setCardVisiblity}
        />
      )}
      {trendingMovies && (
        <CardSection
          sectionType={'trending'}
          tabs={trendingTabs}
          activeTab={activeTrendingTab}
          setActiveTab={setActiveTrendingTab}
          url={url.TRENDING_TODAY}
          movies={trendingMovies}
          cardVisiblity={cardVisiblity}
          setCardVisiblity={setCardVisiblity}
        />
      )}
    </div>
  );
};

export default Main;
