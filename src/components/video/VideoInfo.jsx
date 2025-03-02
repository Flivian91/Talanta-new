import React from "react";
import VideoProfileView from "./VideoProfileView";
import VideoActions from "./VideoActions";

function VideoInfo() {
  return (
    <div className="px-2 py-2">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-medium tracking-wide">
          Video Description is suppose to be here
        </h1>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-between w-full gap-6 md:gap-4">
        <VideoProfileView />
        <VideoActions />
      </div>
    </div>
  );
}

export default VideoInfo;
