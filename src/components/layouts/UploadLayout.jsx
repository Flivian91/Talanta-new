"use client";
import React, { useState } from "react";
import UploadNavigation from "../uploads/UploadNavigation";
import UploadVideoInto from "../uploads/UploadVideoInto";
import UploadVideoHeading from "../uploads/UploadVideoHeading";
import UploadVideoDetails from "../uploads/UploadVideoDetails";

function UploadLayout() {
  const [activeButton, setActiveButton] = useState(1);
  return (
    <div className="flex flex-col gap-5 px-2">
      <UploadNavigation
        onActiveButton={setActiveButton}
        activeButton={activeButton}
      />
      <div className="rounded shadow py-3">
        <UploadVideoHeading activeButton={activeButton} />
        <div className=" flex items-center justify-center ">
          {activeButton === 1 && <UploadVideoInto />}
          {activeButton === 2 && <UploadVideoDetails />}
        </div>
      </div>
    </div>
  );
}

export default UploadLayout;
