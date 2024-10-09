import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="absolute -z-10 w-full h-full">
        <img className="  w-full h-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className=" md:p-0">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
