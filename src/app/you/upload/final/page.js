"use client";

import React, { useEffect, useState } from "react";
import UploadVideoDetails from "@/components/uploads/UploadVideoDetails";

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
    <div>
      {mediaData ? (
        <UploadVideoDetails data={mediaData} />
      ) : (
        <p className="text-center text-lg font-medium">No video found. Please upload again.</p>
      )}
    </div>
  );
}

export default FinalVideoUploadPage;
