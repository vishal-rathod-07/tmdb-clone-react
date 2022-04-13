import Header from './Sections/Header';
import Media from './Sections/Media';
import { API, API_URL } from '../../Constants';

import spinner from '../../assets/images/loader.gif';

import './Sections/moviedetailspage.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { type, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [social, setSocial] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cast, setCast] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [recommandations, setRecommandations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}?api_key=${API}&language=en-US`
        );
        const data = await movieResponse.json();
        setMovie(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovie();
    const fetchSocial = async () => {
      try {
        const socialResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/external_ids?api_key=${API}&language=en-US`
        );
        const data = await socialResponse.json();
        setSocial(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchSocial();
    const fetchProvider = async () => {
      try {
        const providerResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/watch/providers?api_key=${API}&language=en-US`
        );
        const data = await providerResponse.json();
        setProvider(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchProvider();
    const fetchCast = async () => {
      try {
        const castResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/credits?api_key=${API}&language=en-US`
        );
        const data = await castResponse.json();
        setCast(data.cast);
      } catch (error) {
        setError(error);
      }
    };
    fetchCast();
    const fetchCertificate = async () => {
      try {
        const certificateResponse = await fetch(
          `${API_URL}/movie/${id}/release_dates?api_key=${API}`
        );
        const data = await certificateResponse.json();
        data.results.forEach((element) => {
          if (element.iso_3166_1 === 'US') {
            if (element.release_dates.length > 0) {
              element.release_dates.forEach((element) => {
                if (element.certification !== '') {
                  setCertificate(element.certification);
                }
              });
            }
          }
        });
      } catch (error) {
        setError(error);
      }
    };
    type === 'movie' && fetchCertificate();
    const fetchReview = async () => {
      try {
        const reviewResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/reviews?api_key=${API}&language=en-US`
        );
        const data = await reviewResponse.json();
        setReviews(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchReview();

    const fetchTrailer = async () => {
      try {
        const trailerResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/videos?api_key=${API}&language=en-US`
        );
        const data = await trailerResponse.json();
        data.results.map((item) => {
          if (
            item.name === 'Official Trailer' &&
            item.official === true &&
            item.type === 'Trailer'
          ) {
            setTrailerKey(item.key);
          }
        });
      } catch (error) {
        setError(error);
      }
    };
    fetchTrailer();
    const fetchRecommandations = async () => {
      try {
        const recommandationsResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/recommendations?api_key=${API}&language=en-US`
        );
        const data = await recommandationsResponse.json();
        setRecommandations(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchRecommandations();
    const fetchKeyword = async () => {
      try {
        const keywordResponse = await fetch(
          `${API_URL}/${
            type === 'movie' ? 'movie' : 'tv'
          }/${id}/keywords?api_key=${API}`
        );
        const data = await keywordResponse.json();
        setKeywords(data.keywords ?? data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchKeyword();
  }, [id, type]);

  useEffect(() => {
    if (movie && social && cast && reviews && provider && keywords) {
      setLoading(false);
      document.title = `${movie.title ?? movie.name} (${
        (type === 'movie' ? '' : 'TV Series ') +
        ((movie.release_date && movie.release_date.split('-')[0]) ||
          (movie.first_air_date && movie.first_air_date.split('-')[0]))
      }) — The Movie Database (TMDB)`;
    }
  }, [movie, social, cast, reviews, provider, keywords, type]);

  return loading ? (
    <div className='loading d-flex w-100 h-100 align-items-center justify-content-center'>
      <img src={spinner} alt='Loading' />
    </div>
  ) : (
    <section className='movie-detail container-fluid p-0'>
      {movie && provider && (
        <Header
          movie={movie}
          provider={provider}
          type={type}
          trailerKey={trailerKey}
          certificate={certificate}
        />
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
  );
};

export default MovieDetailsPage;
