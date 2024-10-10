import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackGround from "./VideoBackGround";

const MainContanier = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return; //this is also known as early return

  const mainMovies = movies[1];
  const { title, overview, release_date, id } = mainMovies;
  // console.log(mainMovies);
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle
        title={title}
        overview={overview}
        release_date={release_date}
      />
      <VideoBackGround movieId={id} />
    </div>
  );
};

export default MainContanier;
