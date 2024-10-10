import React from "react";

const Loader = () => {
  return (
    <div className="fixed  top-0 leff-0 flex items-center justify-center h-full w-full  bg-black bg-opacity-50 backdrop-blur-sm  pt-10 z-50">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default Loader;
