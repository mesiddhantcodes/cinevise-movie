import React from "react";

const VideoTitle = ({ title, overview, release_date }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] lg:pt-[25%] 2xl:pt-[15%] px-6  md:px-24 absolute text-white bg-gradient-to-r from-black z-10">
      <h1 className="text-xl mt-[20%] md:mt-12 md:text-4xl 2xl:text-6xl font-bold hover:text-red-400">{title}</h1>
      <h2
        className="  text-xl ml-[-10px] md:text-4xl mt-2 bg-gradient-to-r  text-white
       bg-clip-text font-semibold p-2 rounded-lg  "
      >
        {"Released On: " + release_date}
      </h2>
      <p className=" hidden md:hidden lg:hidden xl:block 2xl:block  py-6 text-lg w-2/3 xl:w-11/12">
        {"Description: " + overview}
      </p>
    </div>
  );
};

{
  /* <button className="bg-white text-black text-bold px-2 md:px-12  py-1 md:py-4 text-xl  rounded-sm hover:bg-opacity-50">
          {" "}
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white px-10 p-4 text-xl bg-opacity-40 rounded-sm">
          ℹ️ More INfo
        </button> */
}
export default VideoTitle;
