import React, { useRef, useState } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SETTINGS } from "../utils/constant";
import genAI from "../utils/openAi";
import { addGptMovieResult } from "../redux/gptSlice";
import useSearchMovieTMDB from "../hooks/useSearchMovieTMDB";
import Loader from "./Loader";

const AiSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = useSearchMovieTMDB();

  // Loading state
  const [loading, setLoading] = useState(false);

  const handleAiSearchClick = async () => {
    // Set loading to true when search starts
    setLoading(true);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Tiger, Bahubali";

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: SAFETY_SETTINGS,
      });
      const result = await model.generateContent(gptQuery);
      const responseText = await result.response.text();
      if (!responseText || responseText.trim() === "") {
        setLoading(false);
        return;
      }

      const gptMovies = responseText.split(",");

      const promiseArray = await gptMovies.map((movie) =>
        searchMovieTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResult: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching GPT movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          className="w-full mt-20 md:w-1/2 m-6 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="text-xs m-2 md:text-xl md:p-4 md:m-4 rounded-lg col-span-9"
            placeholder={lang[langKey].AiSearchplaceHolder}
          />
          <button
            className="text-s m-2 md:text-xl md:py-2 md:px-4 md:m-4 bg-red-600 text-white rounded-lg col-span-3"
            onClick={handleAiSearchClick}
          >
            {lang[langKey]?.search}
          </button>
        </form>
      )}
    </div>
  );
};

export default AiSearchBar;
