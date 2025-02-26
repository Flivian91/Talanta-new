"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

function UploadVideoDetails() {
  const [title, setTitle] = useState("This is a dummy title for nowsd");
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full py-4 px-2">
      {/* Description area */}
      <div className="flex flex-col gap-4 w-full">
        {/* Title Element */}
        <div
          className={`group rounded  w-full border  flex flex-col px-2 py-2 ${
            title.length > 100 || title.length < 1
              ? " border-red-600 hover:border-red-900"
              : " hover:border-gray-900 border-gray-400"
          }: `}
        >
          <label
            htmlFor="title"
            className="text-sm font-medium tracking-wide text-gray-600"
          >
            {title.length > 100 ? (
              <span className="text-red-600">Title too long!!</span>
            ) : (
              <span
                className={`${
                  title.length < 1 ? "text-red-600" : "text-gray-600"
                }`}
              >
                Title(required)
              </span>
            )}
          </label>
          <input
            id="title"
            type="text"
            ref={inputRef}
            autoComplete="off"
            autoFocus
            placeholder="Add a title thay describes your Talent"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="peer w-full md:text-lg py-1 border-none outline-none focus:outline-none"
          />
          <div className="invisible peer-focus:visible group-hover:visible flex justify-end items-center text-xs sm:text-sm text-gray-600 font-mono">
            <span>{title.length}</span>
            <span>/</span>
            <span>100</span>
          </div>
        </div>
        {/* Description Element */}
        <div
          className={`group rounded  w-full border  flex flex-col px-2 py-2 ${
            title.length > 100
              ? " border-red-600 hover:border-red-900"
              : " hover:border-gray-900 border-gray-400"
          }: `}
        >
          <label
            htmlFor="description"
            className="text-sm font-medium tracking-wide text-gray-600"
          >
            {description.length > 100 ? (
              <span className="text-red-600">Description too long!!</span>
            ) : (
              <span>Description(required)</span>
            )}
          </label>
          <input
            id="description"
            type="text"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Tell sponsers about your talent."
            className="peer w-full md:text-lg py-1 border-none outline-none focus:outline-none"
          />
          <div className="invisible peer-focus:visible group-hover:visible flex justify-end items-center text-xs sm:text-sm text-gray-600 font-mono">
            <span>{description.length}</span>
            <span>/</span>
            <span>500</span>
          </div>
        </div>
        {/* Add Thumbnail Section */}
        <div>
          <h3>Thumbnail</h3>
          <div className="grid grid-cols-2 gap-6">
            <CldUploadButton uploadPreset="Images">
              <div className="flex items-center flex-col gap-2  py-2 border border-dotted">
                <FaUpload />
                <span>Add File</span>
              </div>
            </CldUploadButton>
            <CldImage
              width="500"
              height="500"
              src="<Public ID>"
              crop="fill"
              removeBackground
              tint="70:blue:purple"
              underlay="<Public ID>"
              sizes="100vw"
              alt="Description of my image"
              className="h-20"
            />
          </div>
        </div>
      </div>
      {/* Video Preview area */}
      <div></div>
    </div>
  );
}

export default UploadVideoDetails;
