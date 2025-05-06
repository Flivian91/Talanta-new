"use client";

import UploadVideoModel from "@/components/models/UploadVideoModel";
import VideoUploadOverlay from "@/components/overlays/VideoUploadOverlay";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function InitialUploadPage() {
  const [showModal, setShowModal] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const { push } = useRouter();

  // Automatically open modal when page loads
  useEffect(() => {
    setShowModal(true);
  }, []);

  // Watch for changes in videoInfo and save to localStorage
  useEffect(() => {
    if (videoInfo) {
      // Ensure correct data is available
      const videoData = {
        url: videoInfo?.secure_url || videoInfo?.url || "",
        thumbnail_url: videoInfo?.thumbnail_url || "",
        display_name: videoInfo?.display_name || "Untitled Video",
        public_id: videoInfo?.public_id || Date.now(),
      };

      if (videoData.url) {
        localStorage.setItem("videoInfo", JSON.stringify(videoData));
        toast.success("Video data saved!");
        push(`/you/upload/final`);
        // ?${new URLSearchParams(videoData)}
      }
    }
  }, [videoInfo, push]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center flex-col py-4 gap-4 mt-5">
        <CldUploadWidget
          uploadPreset="Images"
          onSuccess={(result, { widget }) => {
            console.log("Upload Result:", result);
            setVideoInfo(result?.info);
            widget.close();
          }}
        >
          {({ open }) => (
            <button
              className="bg-gray-200/45 p-12 rounded-full flex items-center justify-center"
              onClick={() => open()}
            >
              <FaFileUpload fontSize={32} />
            </button>
          )}
        </CldUploadWidget>

        <h2 className="text-sm font-medium tracking-wide text-gray-500 text-center">
          Your Videos will be private until Admin Approves them.
        </h2>

        {videoInfo ? (
          <button onClick={() => push(`/you/upload/final`)}>Next</button>
        ) : (
          <CldUploadWidget
            uploadPreset="Images"
            onSuccess={(result, { widget }) => {
              console.log("Upload Result:", result);
              setVideoInfo(result?.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <button
                className="bg-secondary rounded text-white px-4 py-2 tracking-wide font-semibold"
                onClick={() => open()}
              >
                Upload Talent
              </button>
            )}
          </CldUploadWidget>
        )}

        <div className="flex items-center justify-center w-full sm:px-6 md:px-16 px-2 lg:px-24 mt-5">
          <p className="text-center md:text-base text-xs tracking-wide text-gray-400">
            By submitting your videos to Talanta, you acknowledge that you agree
            to Talanta's{" "}
            <Link href={"/"} className="text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"/"} className="text-blue-500">
              Community Guidelines
            </Link>{" "}
            . Please make sure that you do not violate others' copyright or
            privacy rights.{" "}
            <Link href={"/"} className="text-blue-500">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InitialUploadPage;
