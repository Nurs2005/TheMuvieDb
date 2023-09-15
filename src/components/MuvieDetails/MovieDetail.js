import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./MuvieDetails.css";
import HeaderBlock from '../HeaderBlock/HeaderBlock';
import ActorsList from '../ActorsList/ActorsList';
function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieImages, setMovieImages] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [combinedData, setCombinedData] = useState(null);
  const [selectedBackdrop, setSelectedBackdrop] = useState(null);
  function formatNumberWithCommas(number) {
    const parts = number.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2f36dcf39939fab027c6a615ea6552f8`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f36dcf39939fab027c6a615ea6552f8`)
      .then((response) => response.json())
      .then((data) => {
        setMovieCredits(data);
      })
      .catch((error) => {
        console.error('Error fetching movie credits:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=2f36dcf39939fab027c6a615ea6552f8`)
      .then((response) => response.json())
      .then((data) => {
        setMovieImages(data);
      })
      .catch((error) => {
        console.error('Error fetching movie images:', error);
      });
  }, [id]);

  useEffect(() => {
    if (movieDetails && movieCredits) {
      setCombinedData({ ...movieDetails, credits: movieCredits });
    }
  }, [movieDetails, movieCredits]);

  useEffect(() => {
    if (movieImages && movieImages.backdrops && movieImages.backdrops.length > 0) {
      setSelectedBackdrop(movieImages.backdrops[1]);
    }
  }, [movieImages]);
  let firstDirectorName = "";

  if (combinedData && combinedData.credits && Array.isArray(combinedData.credits.crew)) {
    const firstDirector = combinedData.credits.crew.find(
      (crewMember) => crewMember.known_for_department === "Directing" && crewMember.name
    );
  
    if (firstDirector) {
      firstDirectorName = firstDirector.name;
    }
  }
  const formattedBudget = combinedData ? formatNumberWithCommas(combinedData.budget) : null;
  const formattedRevenue = combinedData ? formatNumberWithCommas(combinedData.revenue) : null;
  return (
    <>
      <HeaderBlock />
      {combinedData && selectedBackdrop ? (
        <div className="movie-details-container">
          <div className="breadcrumb">
            <Link className='link' to="/">Home</Link><span className='hr'>|</span>
            <span>{combinedData.original_title}</span>
          </div>
          <div className="posterBlock" style={{
                 background:`url(https://image.tmdb.org/t/p/w1280${selectedBackdrop.file_path}),center,center`,
                 height:'auto',
                 backgroundRepeat:'no-repeat',
                 backgroundPosition:'center,center',
                 backgroundSize:'cover'
                }}>
          <div className="poster">
           <div className="movie-info">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w780/${combinedData.poster_path}`}
              alt="Movie Poster"
            />
            <div className="infoFolm">
            <h1>{combinedData.original_title}</h1>
            <h3 className="plot-heading">PLOT</h3>
            <p className="plot">{combinedData.overview}</p>
            <div className="rating-directors">
              <div className="rating">
                <h3>RATING</h3>
                <div className="rait">
                <p className="rating-value">{combinedData.vote_average}</p>
                </div>
              </div>
              <div className="director">
                  <h3>DIRECTOR</h3>
                  {firstDirectorName && <p>{firstDirectorName}</p>}
                </div>
            </div>
            </div>

          </div>
          </div>
          </div>
          <div className="budget">
            <div className="budgetIn">
              <div className="runTime budgetBlock">
                <p>Running Time: {combinedData.runtime} minutes</p>
              </div>
              <div className="Budget budgetBlock">
                <p>Budget: ${formattedBudget}</p>
              </div>
              <div className="Revenue budgetBlock">
                <p>Revenue: ${formattedRevenue}</p>
              </div>
            </div>
          </div>
          <div className="actors">
            <div className="row d-flex align-items-center justify-content-center mx-auto actorsList" >
                  <ActorsList combinedData={combinedData}/>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default MovieDetail;
