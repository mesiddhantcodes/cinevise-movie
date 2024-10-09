import { useEffect } from "react";
// import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const nowPopularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    // console.log(jsonData);
    dispatch(addPopularMovies(jsonData.results));
  };

  useEffect(() => {
    !nowPopularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
