"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiX, FiSearch, FiEye } from "react-icons/fi";
import pendingTalentsData from "@/components/data/pandingTalents";
import AdminPendingHeader from "@/components/dashboard/admin/pending/AdminPendingHeader";
import AdminPreviewModel from "@/components/dashboard/admin/pending/AdminPreviewModel";

export default function PendingApprovalsPage() {
  const [pendingTalents, setPendingTalents] = useState(pendingTalentsData);
  const [query, setQuery] = useState("");
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Search Function
  const filteredTalents = pendingTalents.filter(
    (talent) =>
      talent.title.toLowerCase().includes(query.toLowerCase()) ||
      talent.user.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Approve Talent
  function approveTalent(id) {
    setPendingTalents(pendingTalents.filter((talent) => talent.id !== id));
    closeModal();
    alert("Talent Approved!");
  }

  // ✅ Reject Talent
  function rejectTalent(id) {
    setPendingTalents(pendingTalents.filter((talent) => talent.id !== id));
    closeModal();
    alert("Talent Rejected!");
  }

  // ✅ Open Modal
  function openModal(talent) {
    setSelectedTalent(talent);
    setIsModalOpen(true);
  }

  // ✅ Close Modal
  function closeModal() {
    setSelectedTalent(null);
    setIsModalOpen(false);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Pending Approvals
      </h1>

      {/* 🔍 Search Bar */}
      <AdminPendingHeader query={query} setQuery={setQuery} />

      {/* 🎭 Pending Talents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTalents.length === 0 ? (
          <p className="text-gray-600">No pending approvals.</p>
        ) : (
          filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
            >
              {/* Thumbnail & Details */}
              <img
                src={talent.thumbnail}
                alt={talent.title}
                className="rounded-lg mb-3 w-full h-32 object-cover cursor-pointer"
                onClick={() => openModal(talent)}
              />
              <h2 className="text-lg font-semibold">{talent.title}</h2>
              <p className="text-gray-500">
                {talent.user} -{" "}
                <span className="text-blue-500">{talent.category}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Submitted on {talent.submittedAt}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openModal(talent)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex-1 mx-1 flex items-center gap-5 justify-center"
                >
                  <FiEye />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 Modal for Preview */}
      {selectedTalent && (
        <AdminPreviewModel
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedTalent={selectedTalent}
          rejectTalent={rejectTalent}
          approveTalent={approveTalent}
        />
      )}
    </div>
  );
}
