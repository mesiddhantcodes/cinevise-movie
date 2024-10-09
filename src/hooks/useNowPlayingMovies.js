import { useEffect } from "react";
// import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addNewPlayingMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    // console.log(jsonData);
    dispatch(addNewPlayingMovies(jsonData.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
