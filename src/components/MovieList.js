import React, { useState } from "react";
import MovieCard from "./MovieCard";
import PopupCard from "./popupCard";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie to show the popup
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedMovie(null); // Set selected movie to null to hide the popup
  };

  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-4xl py-4 text-white">{title} </h1>

      <div className="flex overflow-x-scroll  no-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <div key={movie.id} onClick={() => handleCardClick(movie)}>
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <PopupCard movie={selectedMovie} closePopup={closePopup} />
      )}
    </div>
  );
};

export default MovieList;
