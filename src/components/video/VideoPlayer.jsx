"use client";
import { CldVideoPlayer } from "next-cloudinary";
import React from "react";

function VideoPlayer() {
  return (
    <div>
      <CldVideoPlayer
        width="1920"
        height="780"
        src="https://res.cloudinary.com/talanta-mines/video/upload/v1740662735/be54vxibwgrnd27194y5.mp4"
        className="sticky top-0 left-0 w-full z-10"
      />
    </div>
  );
}

export default VideoPlayer;
