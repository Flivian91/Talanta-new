"use client";
import React, { useState } from "react";
import UploadNavigation from "../uploads/UploadNavigation";
import UploadVideoInto from "../uploads/UploadVideoInto";

function UploadLayout() {
  const [activeButton, setActiveButton] = useState(1);
  return (
    <div className="flex flex-col gap-5 px-2">
      <UploadNavigation
        onActiveButton={setActiveButton}
        activeButton={activeButton}
      />
      <div className="rounded shadow py-3 ">
        {activeButton === 1 && <UploadVideoInto />}
      </div>
    </div>
  );
}

export default UploadLayout;
