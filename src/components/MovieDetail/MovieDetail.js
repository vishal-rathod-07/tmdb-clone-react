import SortcutBar from './Sections/SortcutBar';
import Header from './Sections/Header';
import Media from './Sections/Media';

import './Sections/moviedetail.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState(null);
  const [social, setSocial] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(movie);
  console.log(error);
  console.log(social);
  //   console.log(provider.results.IN.flatrate[0].logo_path);
  console.log(cast);

  //   const providerLogo = provider.results.IN.flatrate[0].logo_path;
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
        console.log('Sucess');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setSocial(data);
        setLoading(false);
        console.log('Sucess');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchSocial();
  }, [id]);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setProvider(data);
        setLoading(false);
        console.log('Sucess');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setCast(data);
        setLoading(false);
        console.log('Sucess');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCast();
  }, [id]);
  return (
    movie && (
      <section className='movie-detail container-fluid p-0'>
        <SortcutBar />
        <Header movie={movie} />
        <Media movie={movie} />
      </section>
    )
  );
};

export default MovieDetail;
