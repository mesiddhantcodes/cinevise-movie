import React from "react";

const PopupCard = ({ movie, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closePopup}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>

        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="mb-4 rounded-lg"
        />

        {/* Movie Description */}
        <p className="text-gray-700 mb-4">{movie.overview}</p>
        <p className="text-gray-500">Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default PopupCard;
