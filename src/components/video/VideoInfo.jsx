import React from "react";
import VideoProfileView from "./VideoProfileView";
import VideoActions from "./VideoActions";

function VideoInfo() {
  return (
    <div className="px-2 py-2">
      <div>
        <h1>Video Description is suppose to be here</h1>
      </div>
      <div className="flex items-center justify-between w-full md:gap-4">
        <VideoProfileView />
        <VideoActions />
      </div>
    </div>
  );
}

export default VideoInfo;
