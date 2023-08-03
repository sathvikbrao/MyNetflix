import React, { useEffect, useState } from "react";
import axios from "./axios"; //this is from axios file in our folder
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"; //image url
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const[trailerUrl,setTrailerUrl]=useState("");
  useEffect(() => {
    //here [] means run once when row loads and dont load again
    async function fetchData() {
      const request = await axios.get(fetchUrl); //this will append https://api.themoviedb.org/3 with fetchUrl value which is mentioned in requests.js
      setMovies(request.data.results); //console.log(request) check the object returned and decide what to retrieve                                                                     //console.log(request.data.results)
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick =(movie)=>{
       if(trailerUrl){
        setTrailerUrl('');
       }
       else{
        movieTrailer(movie?.name||"")
        .then(url=>{
         //if this is the url https://www.youtube.com/watch?v=DVhcKSxAEgw ,i want to get the value after ?v= so i use url class which automatically does that
         const  urlParams=new URLSearchParams( new URL(url).search)
         setTrailerUrl(urlParams.get('v'));
        })
        .catch(err=>console.log(err))
       }
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      {/* title */}
      <h1>{title}</h1>

      <div className="row_posters">
        {movies.map(
          (movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ) //image url is written so because it does nt return image url we must append it
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
