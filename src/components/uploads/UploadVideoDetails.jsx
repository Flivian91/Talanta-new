"use client";
import { CldImage, CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { FaCopy, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function UploadVideoDetails({ data }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const {
    secure_url: secureURL,
    thumbnail_url: thumbnailURL,
    display_name: displayName,
    public_id: publicID,
  } = data;
  console.log("this is the uploased " + data);

  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    categories.length < 3 && setCategories([...categories, category]);
    setCategory("");
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      displayName && setTitle(displayName);
      thumbnailURL && setThumbnail(thumbnailURL);
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
    <div className="grid grid-cols-1  gap-2 md:gap-5 w-full py-4 px-2">
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
                    className="flex items-center flex-row justify-center py-4 md:py-4 gap-3  border-[3px] border-gray-300 border-dashed rounded"
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
        {/* Categories section */}
        <div
          className={`group rounded  w-full border  flex flex-col px-2 py-2 ${
            categories.length === 3
              ? "border-red-600 hover:border-red-900"
              : " hover:border-gray-900 border-gray-400"
          }: `}
        >
          <label
            htmlFor="category"
            className={`text-sm font-medium tracking-wide  ${
              categories.length === 3 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {categories.length === 3 ? (
              <span className="mb-2 inline-block">
                Maximum categories Reached
              </span>
            ) : (
              <span className="mb-2 inline-block">Category(Maximum of 3)</span>
            )}
          </label>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="category"
                placeholder="Add a category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setCategories(e.target.value);
                    setCategory("");
                  }
                }}
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
              {categories.length === 0
                ? null
                : categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
            </ul>
          </form>
        </div>
      </div>
      {/* Video Preview area */}
      <div className="border rounded flex flex-col gap-4 overflow-hidden pointer-events-auto">
        <div className="overflow-y-auto pointer-events-auto w-full ">
          <CldVideoPlayer
            controls={true}
            autoplay={false}
            height={1040}
            preload="metadata"
            className="w-full rounded pointer-events-auto"
            src={secureURL} // Video URL
          />
        </div>

        <div className="flex flex-col gap-3 px-3">
          <h1 className="text-2xl font-semibold tracking-wider">
            {displayName || "The Title"}
          </h1>
          <div className="flex items-center gap-2">
            <p className="w-full truncate">{secureURL}</p>
            <button
              onClick={() => handleCopy(secureURL)}
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
