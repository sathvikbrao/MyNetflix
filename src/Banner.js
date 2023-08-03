import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]); // selecting a random movie image and other decription things for header

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      let randnum = Math.floor(Math.random() * request.data.results.length - 1); //selecting a random movie out of many movies returned
      // console.log(request.data.results[randnum]);
      setMovie(request.data.results[randnum]);
      return request;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "…" : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, //? in the movie? says if the movie returns undefined for some reason it must not crash
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title ----here ? handles any errors such as attribute not available in object etc*/}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div>2 buttons */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        {/* Description */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
       
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
