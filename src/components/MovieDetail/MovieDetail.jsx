import SortcutBar from './Sections/SortcutBar';
import Header from './Sections/Header';
import Media from './Sections/Media';

import './Sections/moviedetail.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = ({ type }) => {
  const { id } = useParams();
  // console.log(id);
  const [movie, setMovie] = useState(null);
  const [social, setSocial] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cast, setCast] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [recommandations, setRecommandations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // movie && console.log(movie);
  error && console.log(error);
  // social && console.log(social);
  //   console.log(provider.results.IN.flatrate[0].logo_path);
  // cast && console.log(cast.cast);
  reviews && console.log(reviews);

  //   const providerLogo = provider.results.IN.flatrate[0].logo_path;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await movieResponse.json();
        setMovie(data);
        console.log('Movie Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchMovie();
    const fetchSocial = async () => {
      try {
        const socialResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/external_ids?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await socialResponse.json();
        setSocial(data);
        console.log('Social Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchSocial();
    const fetchProvider = async () => {
      try {
        const providerResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/watch/providers?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await providerResponse.json();
        setProvider(data);
        console.log('Provider Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchProvider();
    const fetchCast = async () => {
      try {
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/credits?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await castResponse.json();
        setCast(data.cast);
        console.log('Cast Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchCast();
    const fetchReview = async () => {
      try {
        const reviewResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/reviews?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await reviewResponse.json();
        setReviews(data.results);
        console.log('Review Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchReview();

    const fetchTrailer = async () => {
      try {
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/videos?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await trailerResponse.json();
        // console.log(data);
        // setLoading(false);
        console.log('Trailer Fetch Sucess');
      } catch (error) {
        setError(error);
        // setLoading(false);
      }
    };
    fetchTrailer();
    const fetchRecommandations = async () => {
      try {
        const recommandationsResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/recommendations?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US`
        );
        const data = await recommandationsResponse.json();
        setRecommandations(data.results);
        console.log('Recommandations Fetch Sucess');
      } catch (error) {
        setError(error);
      }
    };
    fetchRecommandations();
    const fetchKeyword = async () => {
      try {
        const keywordResponse = await fetch(
          `https://api.themoviedb.org/3/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const data = await keywordResponse.json();
        setKeywords(data.keywords || data.results);
        console.log(data);
        setLoading(false);
        console.log('KeyWords Fetch Sucess');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchKeyword();
  }, [id, type]);

  return (
    !loading && (
      <section className='movie-detail container-fluid p-0'>
        <SortcutBar />
        {movie && provider && (
          <Header movie={movie} provider={provider} type={type} />
        )}
        {cast && reviews && recommandations && provider && (
          <Media
            movie={movie}
            cast={cast}
            keywords={keywords}
            reviews={reviews}
            recommandations={recommandations}
            type={type}
          />
        )}
      </section>
    )
  );
};

export default MovieDetail;
