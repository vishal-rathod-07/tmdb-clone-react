import { useEffect, useState } from 'react';

import Banner from '../Banner/Banner';
import CardSection from '../CardSection/CardSection';
import * as url from '../Constants';
import { popularTabs, trendingTabs } from '../TabList';

import './main.scss';

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [activePopularTab, setActivePopularTab] = useState(popularTabs[0].id);
  const [activeTrendingTab, setActiveTrendingTab] = useState(
    trendingTabs[0].id
  );

  const POPULAR_URL =
    activePopularTab === 'On_TV' ? url.POPULAR_ON_TV : url.POPULAR_IN_THEATERS;

  const TRENDING_URL =
    activeTrendingTab === 'Today' ? url.TRENDING_TODAY : url.TRENDING_THIS_WEEK;

  const getPopularMovies = async () => {
    try {
      const response = await fetch(POPULAR_URL);
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const getTrendingMovies = async () => {
    try {
      const response = await fetch(TRENDING_URL);
      const data = await response.json();
      setTrendingMovies(data.results);
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
      <Banner />
      {popularMovies && (
        <CardSection
          sectionType={'popular'}
          tabs={popularTabs}
          activeTab={activePopularTab}
          setActiveTab={setActivePopularTab}
          url={url.POPULAR_ON_TV}
          movies={popularMovies}
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
        />
      )}
    </div>
  );
};

export default Main;
