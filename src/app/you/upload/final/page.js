"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UploadVideoDetails from "@/components/uploads/UploadVideoDetails";

function FinalVideoUploadPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const thumbnailURL = searchParams.get("thumbnail_url");
  const displayName = searchParams.get("display_name");
  const [mediaData, setMediaData] = useState(null);

  async function getMediaData(id) {
    if (!id) {
      console.log("Id not found");
      return;
    }

    try {
      console.log("Fetching Media for ID:", id);
      const response = await fetch(`/api/media/${id}`, {
        cache: "no-store",
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch data:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Fetched Data:", data);
      setMediaData(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  useEffect(
    function () {
      setMediaData({
        secure_url: url,
        thumbnail_url: thumbnailURL,
        display_name: displayName,
      });
    },
    [url, thumbnailURL, displayName]
  );

  return (
    <div>
      {mediaData ? (
        <UploadVideoDetails data={mediaData} />
      ) : (
        <p className="text-center text-lg font-medium">Loading...</p>
      )}
    </div>
  );
}

export default FinalVideoUploadPage;
