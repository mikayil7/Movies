import React from "react";
import {Link} from 'react-router-dom'

const MovieList =(props)=>{

  const truncateOverView=(string,maxlength)=>{
if (!string) return null;
if (string.length <= maxlength) return string;
return `${string.substring(0,maxlength)}...`;
  }
  
    return (
      <div className="row">
        {props.movies.map((movie) => (
          <div className="col-lg-4" key={movie.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={movie.imageURL}
                className="card-img-top"
                alt="Sample Movie"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{truncateOverView(movie.overview,50)}</p>
                <div className="d-flex justify-content-between align-items -center">
                  <button type="button" onClick={()=> props.deleteMovieProp(movie)}
                    className="btn btn-md btn-outline-danger"
                  >
                    Delete
                  </button>

                  <Link type="button" 
                    className="btn btn-md btn-outline-primary"
                    to={`edit/${movie.id}`}
                  >
                    Edit
                  </Link>
                  <h2>
                    <span className="badge-info">{movie.rating}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }


export default MovieList;
