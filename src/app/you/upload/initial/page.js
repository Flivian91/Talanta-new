"use client";

import UploadVideoModel from "@/components/models/UploadVideoModel";
import VideoUploadOverlay from "@/components/overlays/VideoUploadOverlay";
import { useEffect, useState } from "react";

function InitialUploadPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // Automatically open modal on page load
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showModal && <UploadVideoModel onClose={closeModal} />}
      {showModal && <VideoUploadOverlay onClose={() => closeModal(false)} />}

      {!showModal && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Upload Page</h1>
          <p>Click the button to upload again.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Upload Talent
          </button>
        </div>
      )}
    </div>
  );
}

export default InitialUploadPage;
