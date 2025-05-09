"use client";
import {
  CldImage,
  CldUploadWidget,
  CldVideoPlayer,
  getCldImageUrl,
} from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { FaCopy, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import CategoryListCard from "./CategoryListCard";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../common/LoadingSpinner";
import FinalVideoUploadModel from "../models/FinalVideoUploadModel";
import VideoUploadOverlay from "../overlays/VideoUploadOverlay";
import { useCategories } from "@/hooks/useCategories";

function UploadVideoDetails({ data }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();
  const { push } = useRouter();
  const {
    data: adminCategories,
    isLoading: loadingCategories,
    isError: categoriesError,
  } = useCategories();

  if (categoriesError) {
    console.log("Error Loading Categories");
  }
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    categories.length < 3 && setCategories([...categories, category]);
    setCategory("");
  }

  function handleDeleteCategory(id) {
    setCategories(categories.filter((item) => item.id !== id));
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setTitle(data.display_name);
      setThumbnail(data.thumbnail_url);
    }
  }, []);
  useEffect(() => {
    if (data) {
      // Generate a unique ID based on video public_id
      setVideoId(`video-${data?.public_id || Date.now()}`);
    }
  }, [data]);
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
  function handleField() {
    if (!title) {
      toast.error("Please fill Title field before submitting.");
    } else if (title.length < 3) {
      toast.error("Title length must be more than 3");
    } else if (title.length > 100) {
      toast.error("Title length can not exceed 100");
    } else if (!description) {
      toast.error("Please fill Description field before submitting.");
    } else if (description.length < 10) {
      toast.error("Description must be at least 10 characters long");
    } else if (description.length > 500) {
      toast.error("Description length can not exceed 500");
    } else if (!thumbnail) {
      toast.error("Please fill Tumbnail field before submitting.");
    } else if (categories.length === 0) {
      toast.error("Categories fields must have a value");
    } else {
      createTalent();
    }
    setTimeout(() => setModelOpen(false), 3000);
  }

  // Upload video on the backend.

  async function createTalent() {
    try {
      setLoading(true);

      console.log("Uploading Talent...");

      const payload = {
        title,
        description,
        videoUrl: data?.url, // Ensure data exists before accessing url
        thumbnailUrl: thumbnail || data?.thumbnail_url, // Ensure correct thumbnail
        categories: categories.map((category) => category.toLowerCase()),
        userInfo: {
          userID: user?.id,
          role: user?.publicMetadata.role,
          userName:
            `${user?.firstName + " " + user?.lastName}` ||
            user?.emailAddresses.at(0).emailAddress.split("@").at(0),
          
        },

        userProfileUrl: user?.imageUrl,
      };
      console.log(user);
      
      const token = await getToken();

      const response = await fetch(`/api/talents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);

        toast.success("Talent Uploaded Successfully!");
        push(`/watch/${responseData?.data._id}`);
        localStorage.removeItem("videoInfo");
      } else {
        console.error("Upload Error:", responseData);
        toast.error(responseData.message || "Failed to upload talent");
      }
    } catch (error) {
      console.error("Upload Failed:", error);
      toast.error("Failed to create talent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <section className="flex flex-col  pb-3">
      <div className="py-3 flex items-center justify-center">
        <h1 className="text-xl md:text-3xl font-semibold tracking-wider text-gray-600">
          Video Details
        </h1>
      </div>
      {isModelOpen && (
        <FinalVideoUploadModel
          createTalent={handleField}
          onClose={() => setModelOpen(false)}
          loading={loading}
        />
      )}
      {isModelOpen && (
        <VideoUploadOverlay onClose={() => setModelOpen(false)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 md:gap-5 w-full py-4 px-2">
        {/* Description area */}
        <div className="flex flex-col gap-6  w-full  lg:row-start-1 ">
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
              {description.length > 500 ? (
                <span className="text-red-600">Description too long!!</span>
              ) : (
                <span>Description(required)</span>
              )}
            </label>
            <textarea
              id="description"
              type="text"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={5}
              placeholder="Tell sponsers about your talent."
              className="peer w-full md:text-lg py-1 border-none outline-none focus:outline-none resize-none"
            ></textarea>
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
                  src={
                    thumbnail ||
                    "https://res.cloudinary.com/talanta-mines/video/upload/c_limit,h_60,w_90/v1741595332/vxsgpkxc7ye8nytlhhx4.jpg"
                  }
                  crop="fill"
                  alt="Description of my image"
                />
              )}
            </div>
          </div>
          {/* Categories section */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="categories"
              className={`text-sm font-medium tracking-wide ${
                categories.length === 3 ? "text-green-600" : "text-gray-600"
              }`}
            >
              {categories.length === 3
                ? "Maximum categories reached"
                : "Select Categories (Max 3)"}
            </label>

            <div className="flex flex-wrap gap-2">
              {adminCategories?.data.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  disabled={
                    categories.includes(cat.title) || categories.length >= 3
                  }
                  onClick={() => {
                    if (
                      !categories.includes(cat.title) &&
                      categories.length < 3
                    ) {
                      setCategories([...categories, cat.title]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    categories.includes(cat.title)
                      ? "bg-green-500 text-white"
                      : "border-gray-400 text-gray-600"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() =>
                      setCategories(categories.filter((c) => c !== cat))
                    }
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Video Preview area */}
        <div className="border rounded flex flex-col gap-4 row-start-1 ">
          <div className="w-full ">
            {videoId && (
              <CldVideoPlayer
                id={Date.now()}
                controls={true}
                autoplay={false}
                width="1920"
                height="1480"
                preload="metadata"
                className="w-full rounded "
                pictureInPictureToggle
                logo={{
                  imageUrl: getCldImageUrl({
                    src: "https://res.cloudinary.com/talanta-mines/image/upload/v1741598183/WhatsApp_Image_2025-02-12_at_00.43.16_4ae02cb0_kdkflu.jpg",
                  }),
                  // imageUrl: '<Your Image URL',
                  onClickUrl: "https://talanta-new.vercel.app/",
                }}
                src={data?.url} // Video URL
                onMetadataLoad={() => {
                  setVideoId(`video-${data?.public_id}`);
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 px-3">
            <h1 className="text-2xl font-semibold tracking-wider">
              {data?.display_name || "The Title"}
            </h1>
            <div className="flex items-center gap-2">
              <p className="w-full truncate">{data?.url}</p>
              <button
                onClick={() => handleCopy(data?.url)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Upload button */}
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => setModelOpen(true)}
          className="px-12 py-2 bg-secondary text-white rounded text-xl tracking-wide font-semibold"
        >
          Complete Upload
        </button>
      </div>
    </section>
  );
}

export default UploadVideoDetails;
