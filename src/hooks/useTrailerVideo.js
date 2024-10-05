// import React from 'react';
import { useEffect } from "react";

import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const jsonData = await data.json();
    const filerData = jsonData.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filerData.length ? filerData[0] : jsonData.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer));
    // setTrailer(trailer.key);
    // console.log(jsonData);
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useTrailerVideo;
