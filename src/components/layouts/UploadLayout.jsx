"use client";
import React, { useState } from "react";
import UploadNavigation from "../uploads/UploadNavigation";
import UploadVideoInto from "../uploads/UploadVideoInto";
import UploadVideoHeading from "../uploads/UploadVideoHeading";
import UploadVideoDetails from "../uploads/UploadVideoDetails";
import UploadVisibilityTerms from "../uploads/UploadVisibilityTerms";
import { useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function UploadLayout() {
  const [activeButton, setActiveButton] = useState(1);
  const [videoInfo, setVideoInfo] = useState({});
  const [title, setTitle] = useState(videoInfo?.display_name || "");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categories, setCategories] = useState([]);
  const { userId } = useAuth();
  const { push } = useRouter();

  async function createTalent() {
    try {
      const response = await fetch("/api/talents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl: videoInfo.secure_url,
          thumbnailUrl: thumbnail || videoInfo.thumbnail_url,
          userId: userId,
          categories: categories.map((category) => category.toLowerCase()),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Talent Uploaded Successfully!");
        push(`/watch/${data.$id}`);
      } else {
        toast.error(data[0]?.message || "Failed to upload talent");
      }
    } catch (error) {
      toast.error("Failed to create talent");
    }
  }
  // Handle Next function
  function handleNext() {
    videoInfo.length == undefined
      ? setActiveButton(1)
      : setActiveButton((next) => (next === 3 ? 3 : next + 1));
  }

  return (
    <div className="flex flex-col gap-5 px-2">
      <UploadNavigation
        onActiveButton={setActiveButton}
        activeButton={activeButton}
      />
      <div className="rounded shadow py-3">
        <UploadVideoHeading activeButton={activeButton} />
        <div className=" overflow-y-auto  w-full  ">
          {activeButton === 1 && (
            <UploadVideoInto
              setVideoInfo={setVideoInfo}
              onActiveButton={setActiveButton}
            />
          )}
          {activeButton === 2 && (
            <UploadVideoDetails
              videoInfo={videoInfo}
              description={description}
              setDescription={setDescription}
              title={title}
              setTitle={setTitle}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              categories={categories}
              setCategories={setCategories}
            />
          )}
          {activeButton === 3 && (
            <UploadVisibilityTerms createTalent={createTalent} />
          )}
        </div>
        <div className="flex justify-between px-2 py-2 transition-all duration-300 border-t border-gray-200">
          {activeButton === 1 ? (
            <span></span>
          ) : (
            <button
              onClick={() =>
                setActiveButton((prev) => (prev === 1 ? 1 : prev - 1))
              }
              className="px-4 py-2 bg-gray-300 tracking-wider font-semibold rounded hover:bg-gray-300/80 hover:text-black"
            >
              Back
            </button>
          )}
          {activeButton === 3 ? (
            <span></span>
          ) : (
            <button
              onClick={() => handleNext()}
              className={`px-4 py-2  tracking-wider bg-accent hover:bg-accent/80 font-semibold rounded  text-white`}
            >
              Next 
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadLayout;
