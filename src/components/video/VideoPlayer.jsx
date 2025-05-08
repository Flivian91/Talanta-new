"use client";
import { CldVideoPlayer, getCldImageUrl } from "next-cloudinary";
import React from "react";

function VideoPlayer({ videoUrl }) {
  return (
    <div>
      <CldVideoPlayer
        id={Date.now()}
        controls={true}
        autoplay={false}
        // width="1920"
        // height="780"
        preload="metadata"
        className="w-full rounded "
        pictureInPictureToggle
        logo={{
          imageUrl: getCldImageUrl({
            src: "https://res.cloudinary.com/talanta-mines/image/upload/v1741598183/WhatsApp_Image_2025-02-12_at_00.43.16_4ae02cb0_kdkflu.jpg",
          }),
          // imageUrl: '<Your Image URL',
          onClickUrl: "https://talanta-new.vercel.app/",
        }}
        src={videoUrl} // Video URL
      />
    </div>
  );
}

export default VideoPlayer;
