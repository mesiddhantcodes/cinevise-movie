import { React, useEffect } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContanier from "./MainContanier";
import SecondaryContainer from "./SecondaryContainer";
const Browse = () => {
  // fetch data from api and update the store
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContanier />

      <SecondaryContainer />
      {/*
        MainContainer
            - VideobackGround
            - VideoTitle
        SecondaryContainer
            - MovieList * n
            - cards* n
       */}
    </div>
  );
};

export default Browse;

// "https://occ-8-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeVIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
