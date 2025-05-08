import React from "react";
import LikeButton from "../buttons/LikeButton";
import SaveButton from "../buttons/SaveButton";
import ShareButton from "../buttons/ShareButton.";
import DisLikeButton from "../buttons/DisLikeButton";

function VideoActions() {
  return (
    <div className="w-full flex items-center justify-between md:justify-center">
      <LikeButton />
      {/* <div className="flex items-center md:justify-center gap-2 md:gap-4 w-full">
        <LikeButton />
         <DisLikeButton /> 
        <SaveButton />
        <ShareButton /> 
      </div> */}
    </div>
  );
}

export default VideoActions;
