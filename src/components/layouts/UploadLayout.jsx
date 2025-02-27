"use client";
import React, { useState } from "react";
import UploadNavigation from "../uploads/UploadNavigation";
import UploadVideoInto from "../uploads/UploadVideoInto";
import UploadVideoHeading from "../uploads/UploadVideoHeading";
import UploadVideoDetails from "../uploads/UploadVideoDetails";
import UploadVisibilityTerms from "../uploads/UploadVisibilityTerms";

function UploadLayout() {
  const [activeButton, setActiveButton] = useState(1);
  const [videoInfo, setVideoInfo] = useState({});
  console.log(videoInfo);

  return (
    <div className="flex flex-col gap-5 px-2">
      <UploadNavigation
        onActiveButton={setActiveButton}
        activeButton={activeButton}
      />
      <div className="rounded shadow py-3">
        <UploadVideoHeading activeButton={activeButton} />
        <div className=" overflow-y-auto  w-full  ">
          {activeButton === 1 && (
            <UploadVideoInto
              setVideoInfo={setVideoInfo}
              onActiveButton={setActiveButton}
            />
          )}
          {activeButton === 2 && <UploadVideoDetails videoInfo={videoInfo} />}
          {activeButton === 3 && <UploadVisibilityTerms  />}
        </div>
        <div className="flex justify-between px-2 py-2 transition-all duration-300 border-t border-gray-200">
          {activeButton === 1 ? (
            <span></span>
          ) : (
            <button
              onClick={() =>
                setActiveButton((prev) => (prev === 1 ? 1 : prev - 1))
              }
              className="px-4 py-2 bg-gray-300 tracking-wider font-semibold rounded hover:bg-gray-300/80 hover:text-black"
            >
              Back
            </button>
          )}
          {activeButton === 3 ? (
            <span></span>
          ) : (
            <button
              onClick={() =>
                setActiveButton((next) => (next === 3 ? 3 : next + 1))
              }
              className="px-4 py-2 bg-accent tracking-wider font-semibold rounded hover:bg-accent/80 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadLayout;
