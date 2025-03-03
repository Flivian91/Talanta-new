"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UploadVideoDetails from "@/components/uploads/UploadVideoDetails";

function FinalVideoUploadPage() {
  const searchParams = useSearchParams();
  const publicId = searchParams.get("public_id");
  const [mediaData, setMediaData] = useState(null);

  useEffect(
    function () {
      getMediaData(publicId);
    },
    [publicId]
  );
  async function getMediaData(id) {
    // Fetch the media data from the server
    try {
      const response = await fetch(`/api/media/${id}`);
      const data = await response.json();
      setMediaData(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <UploadVideoDetails />
    </div>
  );
}

export default FinalVideoUploadPage;
