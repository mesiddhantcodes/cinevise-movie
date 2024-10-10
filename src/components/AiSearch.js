import React from "react";
import AiSearchBar from "./AiSearchBar";
import AiMovieSuggestions from "./AiMovieSuggestions";
import { BG_URL } from "../utils/constant";

const AiSearch = () => {
  return (
    <>
      <div className="absolute -z-10 w-full h-full">
        <img
          className="  w-full h-screen object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <div className=" md:p-0">
        <AiSearchBar />
        <AiMovieSuggestions />
      </div>
    </>
  );
};

export default AiSearch;
