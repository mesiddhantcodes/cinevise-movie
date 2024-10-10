import React from "react";
import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

const VideoBackGround = ({ movieId }) => {
  //   const [trailer, setTrailer] = useState(null);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useTrailerVideo(movieId);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video scale-[1.0] pointer-events-none"
        src={
          `https://www.youtube.com/embed/${trailerVideo?.key}` +
          `?controls=0&showinfo=0?&autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}`
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
