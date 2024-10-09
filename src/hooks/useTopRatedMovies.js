import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const nowTopRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    console.log("TOPRATEd", jsonData);
    dispatch(addTopRatedMovies(jsonData.results));
  };

  useEffect(() => {
    !nowTopRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
