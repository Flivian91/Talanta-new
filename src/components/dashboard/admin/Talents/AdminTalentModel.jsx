"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiCheck, FiTrash, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function AdminTalentModal({ talent, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(talent?.title || "");
  const [description, setDescription] = useState(talent?.description || "");
  const [status, setStatus] = useState(talent?.approved ? "approved" : "pending");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await onUpdate({
        ...talent,
        title,
        description,
        approved: status === "approved",
      });
      toast.success("Talent updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update talent");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await onDelete(talent._id);
      toast.success("Talent deleted");
      onClose();
    } catch (err) {
      toast.error("Failed to delete talent");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-xl p-6 relative space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Manage Talent</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Video Preview */}
        <div className="rounded overflow-hidden aspect-video w-full">
          <video controls className="w-full rounded">
            <source src={talent?.videoUrl} type="video/mp4" />
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
            <label className="text-sm font-medium text-gray-700">Description</label>
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
            onClick={handleDelete}
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
              onClick={handleSave}
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

export default AdminTalentModal;
