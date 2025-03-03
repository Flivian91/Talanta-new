import React from "react";

function VideoUploadOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 h-screen w-full inset-0 bg-black bg-opacity-60 z-30"
    ></div>
  );
}

export default VideoUploadOverlay;
