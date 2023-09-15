import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import "bootstrap/dist/css/bootstrap.min.css"
import Form from '../Form/Form';
import HeaderBlock from '../HeaderBlock/HeaderBlock';
import './MovieInfo.css';

export default function MovieInfo({ value, onSubmit, onChange }) {
  const apiKey = '2f36dcf39939fab027c6a615ea6552f8';
  const popularMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
  const [movies, setMovies] = useState([]);
  const [seachMovie, setSeachMovie] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [showMegaBlock, setShowMegaBlock] = useState(true); 
  const [buttonClicked, setButtonClicked] = useState(false);
  const uniqueArray = movies.filter((obj, index, self) =>
  index === self.findIndex((item) => item.id === obj.id)
);

  useEffect(() => {
    if (!query) {
      loadPopularMovies();
    }
  }, [page]);

useEffect(() => {
  if (query) {
    searchMovies();
  }
}, [query, pageSearch]);

  const searchMovies = async () => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${pageSearch}`;
      const res = await fetch(url);
      const data = await res.json();
      setSeachMovie((prevMovies) => [...prevMovies,...data.results]); 
      setLoading(false);
    } catch (error) {
      console.error('Error', error);
      setLoading(false);
    }
  }

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const url = `${popularMoviesUrl}&page=${page}`; 
      const res = await fetch(url);
      const data = await res.json();
      setMovies((prevMovies) => [...prevMovies,...data.results]); 
      setLoading(false);
    } catch (error) {
      console.error('Error', error);
      setLoading(false);
    }
  }

  const changeHandler = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setSeachMovie([])
    setShowMegaBlock(!newValue);
  }
  const loadMore = () => {
    setButtonClicked(true);
    if(!query){
      setPage((prevPage) => prevPage + 1); 
    }
    if(query){
      setPageSearch((prevPage) => prevPage + 1); 
    }
  }

  return (
    <div className="container-fluid movie-app">
      <HeaderBlock />
      {showMegaBlock && ( 
        <div className="Mega" style={{
          background: `url(https://image.tmdb.org/t/p/w1280/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg),center,center`,
          height: 'auto',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center,center',
          backgroundSize: 'cover'
        }}>
          <div className="space">
          </div>
          <div className="mega">
            <div className="MegaTitlse">
              <h1>Meg 2: The Trench</h1>
              <p>An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.</p>
            </div>
          </div>
        </div>
      )}
      <Form value={query} onSubmit={searchMovies} onChange={changeHandler} />
      <div style={{ width: '80%' }} className="row d-flex align-items-center justify-content-center mx-auto">
        <MovieList uniqueArray={uniqueArray} buttonClicked={buttonClicked} query={query} seachMovie={seachMovie} movies={movies} loading={loading} />
      </div>
      <div className="load">
        <button type='submit' onClick={loadMore} className='LoadBtn'>LOAD MORE</button>
      </div>
    </div>
  );
}
