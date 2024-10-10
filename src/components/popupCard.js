import React from "react";

const PopupCard = ({ movie, closePopup }) => {
  return (
    <div className="  fixed inset-10 bg-black bg-opacity-50 flex justify-center items-center ">
      <div
        className="bg-black rounded-lg p-4 sm:p-6 relative  max-w-xs sm:max-w-md w-5/6 sm:w-full md:w-full lg:w-full shadow-lg md:shadow-xl shadow-red-200 bg-cover bg-center opacity"
        style={{
          
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      >
        <button
         

          className="absolute  top-4 right-4 text-white text-xl sm:text-2xl  d:text-3xl lg:text-4xl xl:text:4xl 2xl:text-4xl  text-white-500 hover:text-red-700  z-[1000]"
          onClick={closePopup}
          style={{
            zIndex:10000,
            textShadow:
              "0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000", // Neon red glow
          }}
        >
          &times;
        </button>
        <h2 className="text-s sm:text-xl text-white font-bold mb-4 underline ">
          {movie.title}
        </h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="mb-4 rounded-lg w-[30%] h-[30%]  sm:w-[25%] md:w-[30%] lg:w-[35%] xl:w-[40%] 2xl:w-[50%] "
        />
        <p
          className="text-white text-xs hover:text-base sm:text-sm sm:hover:text-base md:text-base lg:hover:text-xl lg:text-lg xl:text-lg  "
          style={{ textShadow: "2px 2px 8px rgba(255, 0, 0, 0.7)" }}
        >
          {"Popularity :" + movie.popularity}
        </p>
        <p
          className="text-white text-xs hover:text-base sm:text-sm sm:hover:text-base md:text-base lg:hover:text-xl lg:text-lg xl:text-lg  mb-4 "
          style={{ textShadow: "2px 2px 8px rgba(255, 0, 0, 0.7)" }}
        >
          {movie.overview}
        </p>
        <p
          className="text-white text-xs hover:text-base sm:text-sm sm:hover:text-base md:text-base lg:hover:text-xl lg:text-lg xl:text-lg  "
          style={{ textShadow: "2px 2px 8px rgba(255, 0, 0, 0.7)" }}
        >
          Release Date: {movie.release_date}
        </p>
      </div>
    </div>
  );
};

export default PopupCard;
