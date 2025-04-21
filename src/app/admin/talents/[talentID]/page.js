"use client";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import AdminTalentSkeleton from "@/components/dashboard/admin/Talents/AdminTalentSkeleton";
import { extractPublicIdFromUrl } from "@/helpers/extractPublicIDFromUrl";
import { useSingleTalent } from "@/hooks/useGetSingleTalent";
import { useAuth } from "@clerk/nextjs";
import { CldVideoPlayer } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiCheck, FiTrash, FiX } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";

function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const { back } = useRouter();
  const { talentID } = useParams();
  const [publicID, setPublicID] = useState(null);

  const { data: talent, error, isLoading } = useSingleTalent(talentID);

  // const {title:talentTitle, description:talentDescription, videoUrl, approved} = talent?.data

  if (error) {
    console.log("Error fetching Talent Data");
  }

  useEffect(
    function () {
      setStatus(talent?.data?.approved ? "Approved" : "Pending");
    },
    [talent]
  );
  useEffect(() => {
    if (talent?.data?.videoUrl) {
      const id = extractPublicIdFromUrl(talent.data.videoUrl);
      setPublicID(id);
    }
  }, [talent]);

  console.log(publicID);
  if (isLoading) {
    return <AdminTalentSkeleton />;
  }

  return (
    <div>
      <div className="py-2">
        <button
          onClick={() => back()}
          className="flex items-center gap-2 px-3 py-1 bg-gray-200 shadow rounded text-black"
        >
          <IoIosArrowRoundBack />
          <span>back</span>
        </button>
      </div>
      <div className="bg-white w-full rounded-lg shadow-xl px-3 py-2 relative space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Manage Talent
          </h2>
          <div className="text-black ">
            {talent?.data?.approved ? (
              <span className="px-2 py-1 bg-green-100/60 rounded text-green-600">
                Approved
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100/60 rounded text-red-600">
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Video Preview */}
        <div className="rounded overflow-hidden w-full">
          {publicID ? (
            <CldVideoPlayer
              id="Video Image"
              width="1920"
              height="580"
              src={publicID}
              pictureInPictureToggle
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded"></div>
          )}

          {/* <video
            height={380}
            className="aspect-video w-full"
            src="https://res.cloudinary.com/talanta-mines/video/upload/v1741868953/vdnxhwnrbydx9mtq32re.mp4"
          /> */}
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={talent?.data?.title || title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={talent?.data?.description || description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 text-sm border-t">
          <button
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            <FiTrash /> Delete
          </button>
          <div className="flex sm:flex-row flex-col gap-3">
            {talent?.data?.approved ? (
              <button
                onClick={() => setStatus("pending")}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FiX /> Reject
              </button>
            ) : (
              <button
                onClick={() => setStatus("approved")}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FiCheck /> Approve
              </button>
            )}
            <div className="flex items-center justify-center">
              <button
                // onClick={() => handleSave()}
                // disabled={isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <p className="w-4 h-4 rounded-full border-t border-b border-white animate-spin"></p>
                )}
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
