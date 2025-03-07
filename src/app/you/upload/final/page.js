"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UploadVideoDetails from "@/components/uploads/UploadVideoDetails";

function FinalVideoUploadPage() {
  const searchParams = useSearchParams();
  const publicId = searchParams.get("public_id");
  const [mediaData, setMediaData] = useState(null);

  async function getMediaData(id) {
    // Fetch the media data from the server
    try {
      const response = await fetch(`/api/media/${id}`, {
        cache: "no-store",
      });
      console.log("Response Status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch data");
        return;
      }

      const data = await response.json();
      console.log("Fetched Data:", data);
      setMediaData(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(
    function () {
      getMediaData(publicId);
    },
    [publicId]
  );
  // console.log(mediaData.secure_url);

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
