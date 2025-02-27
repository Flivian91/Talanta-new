"use client";
import {
  CldImage,
  CldUploadButton,
  CldUploadWidget,
  CldVideoPlayer,
} from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { FaCopy, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function UploadVideoDetails({ videoInfo }) {
  const { display_name, url, thumbnail_url } = videoInfo;
  const [title, setTitle] = useState(display_name || "");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  function handleCopy(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
      });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 w-full py-4 px-2">
      {/* Description area */}
      <div className="flex flex-col gap-4  w-full overflow-y-auto">
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
        <div className="py-2 border border-gray-300 rounded px-2">
          <h3 className="text-sm mb-2 font-medium tracking-wide text-gray-600">
            Thumbnail
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CldUploadWidget
              uploadPreset="Images"
              onSuccess={(result, { widget }) => {
                setThumbnail(result?.info?.url);
                toast.success("Thumbnail Uploaded Successfully!");
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="flex items-center flex-row justify-center py-4 gap-3  border-[3px] border-gray-300 border-dashed rounded"
                  >
                    <FaUpload />
                    <span>Add File</span>
                  </button>
                );
              }}
            </CldUploadWidget>
            {thumbnail && (
              <CldImage
                width="500"
                height="200"
                src={thumbnail}
                crop="fill"
                alt="Description of my image"
              />
            )}
          </div>
        </div>
        <div className="px-2 py-2 border border-gray-300 rounded flex flex-col gap-2">
          {/* Categories section */}
          <label
            htmlFor="category"
            className="md:text-sm text-xs  font-medium tracking-wide text-gray-600"
          >
            Category(Maximum of 3)
          </label>
          <form className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="category"
                placeholder="Add a category"
                required
                className="border outline-none focus:outline-none border-gray-300 rounded px-2 py-1 font-medium w-full"
              />
              <button
                type="submit"
                className="bg-secondary text-white rounded px-2 py-1 text-sm font-medium tracking-wider"
              >
                Add
              </button>
            </div>
            <ul className="flex items-center gap-3 text-sm font-medium text-gray-500 list-disc list-inside">
              <li>Games</li>
              <li>Travel</li>
              <li>Technology</li>
            </ul>
          </form>
        </div>
      </div>
      {/* Video Preview area */}
      <div className="border rounded flex flex-col gap-4 overflow-hidden pointer-events-auto">
        <div className="relative w-full rounded-t overflow-hidden flex-1">
          <CldVideoPlayer
            width="1920"
            controls={true}
            height="1580"
            className="w-full h-full rounded-t pointer-events-auto"
            src={
              url ||
              "https://res.cloudinary.com/talanta-mines/video/upload/v1740645385/axhru4w5mpkv629wmfkx.mp4"
            }
          />
        </div>

        <div className="flex flex-col gap-3 px-3">
          <h1 className="text-2xl font-semibold tracking-wider">
            {display_name || "The Title"}
          </h1>
          <div className="flex items-center gap-2">
            <p className="w-full truncate">{url}</p>
            <button
              onClick={() => handleCopy(url)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <FaCopy />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideoDetails;
