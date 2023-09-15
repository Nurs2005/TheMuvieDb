import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./ActorsList.css"
export default function ActorsList({ combinedData}) {
  return (
    <>
              {combinedData.credits &&
                combinedData.credits.cast.map((actor) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 actor" key={actor.id}>
                    <div className="actor-card">
                    {actor.profile_path ? (
                              <img
                                className="actor-thumb"
                                src={`https://image.tmdb.org/t/p/w780/${actor.profile_path}`}
                                alt={actor.name}
                              />
                            ) : (
                              <img
                              className='actor-thumbb'
                                src="../images.jpg"
                              />
                            )}
                      <div className="actor-info">
                        <h5 className="actor-name">{actor.name}</h5>
                        <p className="actor-character">{actor.character}</p>
                      </div>
                    </div>
                  </div>
                ))}
    </>
  )
}
