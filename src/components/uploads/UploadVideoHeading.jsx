import React from "react";

function UploadVideoHeading({ activeButton }) {
  return (
    <div className="py-2 border-b px-2">
      <h1 className="font-semibold md:text-xl sm:text-lg text-base tracking-wider">
        {activeButton === 1 ? (
          <span>Upload Video</span>
        ) : activeButton === 2 ? (
          <span>Video Details</span>
        ) : (
          <span>Video Visibility Terms</span>
        )}
      </h1>
    </div>
  );
}

export default UploadVideoHeading;
