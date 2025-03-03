"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function FinalVideoUploadPage() {
  const searchParams = useSearchParams();
  const secureUrl = searchParams.get("secure_url");
  const thumbnailUrl = searchParams.get("thumbnail_url");

  useEffect(
    function () {
      console.log(secureUrl, thumbnailUrl);
    },
    [secureUrl, thumbnailUrl]
  );

  return <div>This is the final video Upload page.</div>;
}

export default FinalVideoUploadPage;
