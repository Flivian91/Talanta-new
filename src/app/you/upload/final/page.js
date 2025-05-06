"use client";

import React, { useEffect, useState } from "react";
import UploadVideoDetails from "@/components/uploads/UploadVideoDetails";
import VideoNotFound from "@/components/uploads/VideoNotFound";
import { useUser } from "@clerk/nextjs";

function FinalVideoUploadPage() {
  const [mediaData, setMediaData] = useState(null);


  useEffect(() => {
    // Retrieve video data from LocalStorage
    const storedData = localStorage.getItem("videoInfo");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Retrieved Data from LocalStorage:", parsedData);
        setMediaData(parsedData);
      } catch (error) {
        console.error("Error parsing video data:", error);
      }
    } else {
      console.warn("No video data found in LocalStorage.");
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {mediaData ? <UploadVideoDetails data={mediaData} /> : <VideoNotFound />}
    </div>
  );
}

export default FinalVideoUploadPage;
