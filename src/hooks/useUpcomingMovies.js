import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcomingMovies } from "../redux/movieSlice";

const UseUpcomingMovies = () => {
  const dispatch = useDispatch();
  const nowUpcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addUpcomingMovies(jsonData.results));
  };
  useEffect(() => {
    !nowUpcomingMovies && getUpcomingMovies();
  }, []);
};

export default UseUpcomingMovies;
