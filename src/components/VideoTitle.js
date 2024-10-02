import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen  aspect-video pt-[30%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text -lg w-1/2">{overview}</p>
      <div>
        <button className="bg-white text-black text-bold px-10 p-4 text-xl  rounded-sm hover:bg-opacity-50">
          {" "}
          ▶️ Play
        </button>
        <button className=" mx-2 bg-gray-500 text-white px-10 p-4 text-xl bg-opacity-40 rounded-sm">
          ℹ️ More INfo
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
