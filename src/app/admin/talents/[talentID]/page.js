"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
      <div className="bg-white w-full rounded-lg shadow-xl p-6 relative space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Manage Talent</h2>
          <div className="text-black ">
            <span className="px-2 py-1 bg-red-100/60 rounded text-red-600">Pending</span>
          </div>
        </div>

        {/* Video Preview */}
        <div className="rounded overflow-hidden aspect-video w-full">
          <video controls className="w-full rounded ">
            <source src={"url"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
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
            <button
              onClick={() => setStatus("pending")}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              <FiX /> Reject
            </button>
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
