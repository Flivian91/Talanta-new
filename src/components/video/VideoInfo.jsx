import React from "react";
import VideoProfileView from "./VideoProfileView";
import LikeButton from "../buttons/LikeButton";

function VideoInfo({ data }) {
  return (
    <div className="px-2 py-2">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-medium tracking-wide">
          {data.title}
        </h1>
      </div>
      <div className="flex items-center flex-row justify-between w-full gap-6 md:gap-4 ">
        <VideoProfileView data={data} />
        <LikeButton data={data} />
      </div>
    </div>
  );
}

export default VideoInfo;
