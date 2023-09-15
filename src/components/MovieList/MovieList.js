import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import "./MovieList.css";

export default function MovieList({movies, loading, query, seachMovie,uniqueArray }) {
  let moviesToRender;

  if (query) {
      moviesToRender = seachMovie.length > 0 ? (
        seachMovie.map((movie, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4" key={index}>
            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
              <div className="card">
                {movie.poster_path ? (
                  <img
                    className="img-fluid img"
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                  />
                ) : (
                  <img
                    className="img-fluid"
                    src="../images.jpg"
                  />
                )}
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col">
          <p>No movies found.</p>
        </div>
      );
  } else{
      moviesToRender = movies.length > 0 ? (
        uniqueArray.map((movie, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4" key={index}>
            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
              <div className="card">
                {movie.poster_path ? (
                  <img
                    className="img-fluid img"
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                  />
                ) : (
                  <img
                    className="img-fluid"
                    src="../images.jpg"
                  />
                )}  
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col">
          <p>No movies found.</p>
        </div>
      );
  } 

  return (
    <>
      {loading ? <p>Loading...</p> : moviesToRender}
    </>
  );
}
