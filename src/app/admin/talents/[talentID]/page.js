"use client";
import { useSingleTalent } from "@/hooks/useGetSingleTalent";
import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsBack } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiCheck, FiTrash, FiX } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";

function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const { back } = useRouter();
  const { talentID } = useParams();

  const { data: talent, error, isLoading } = useSingleTalent(talentID);
  console.log(talent);

  // const {title:talentTitle, description:talentDescription, videoUrl, approved} = talent?.data

  if (error) {
    console.log("Error fetching Talent Data");
  }

  // useEffect(function(){
  //   setTitle(talentTitle)
  //   setDescription(talentDescription)
  // }, [])
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
            {/* <span className="px-2 py-1 bg-red-100/60 rounded text-red-600">Pending</span> */}
            <span className="px-2 py-1 bg-green-100/60 rounded text-green-600">
              Approved
            </span>
          </div>
        </div>

        {/* Video Preview */}
        <div className="rounded overflow-hidden aspect-video w-full">
          <video controls className="w-full rounded ">
            <source src={talent?.data?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            <FiTrash /> Delete
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setStatus("approved")}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <FiCheck /> Approve
            </button>
            {/* <button
              onClick={() => setStatus("pending")}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              <FiX /> Reject
            </button> */}
            <button
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
