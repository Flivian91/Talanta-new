"use client";
import { CldVideoPlayer } from "next-cloudinary";
import React from "react";

function VideoPlayer() {
  return (
    <div>
      <CldVideoPlayer
        width="1920"
        height="1080"
        src="https://res.cloudinary.com/talanta-mines/video/upload/v1740662735/be54vxibwgrnd27194y5.mp4"
      />
    </div>
  );
}

export default VideoPlayer;
