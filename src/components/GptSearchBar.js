import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SETTINGS } from "../utils/constant";
import genAI from "../utils/openAi";
import { addGptMovieResult } from "../redux/gptSlice";
import useSearchMovieTMDB from "../hooks/useSearchMovieTMDB";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = useSearchMovieTMDB();

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    // make an API call to GPT API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendatioin system and suggest some movies for the query :" +
      searchText.current.value +
      ". only give me names of 5 movies ,comma seperated like the exam[le result given ahead .Example Result:Gadar,Sholay,Don, Tiger, Bhahubali";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: SAFETY_SETTINGS,
    });
    const result = await model.generateContent(gptQuery);
    const responseText = await result.response.text();
    if (!responseText || responseText.trim() === "") {
      console.error("Error: Response text is empty or invalid.");
      return;
    }
    const gptMovies = responseText.split(",");
    // for each movie i will search TMDB API
    const promiseArray = await gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResult: tmdbResults })
    );
    // console.log(tmdbResults);
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2  m-6 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchplaceHolder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-600 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
