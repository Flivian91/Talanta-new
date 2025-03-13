"use client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiCheck, FiX, FiSearch, FiEye } from "react-icons/fi";
import pendingTalentsData from "@/components/data/pandingTalents";

export default function PendingApprovalsPage() {
  const [pendingTalents, setPendingTalents] = useState(pendingTalentsData);
  const [query, setQuery] = useState("");
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Search Function
  const filteredTalents = pendingTalents.filter((talent) =>
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pending Approvals</h1>

      {/* 🔍 Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/3 mb-6">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search pending talents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* 🎭 Pending Talents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTalents.length === 0 ? (
          <p className="text-gray-600">No pending approvals.</p>
        ) : (
          filteredTalents.map((talent) => (
            <div key={talent.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
              {/* Thumbnail & Details */}
              <img
                src={talent.thumbnail}
                alt={talent.title}
                className="rounded-lg mb-3 w-full h-32 object-cover cursor-pointer"
                onClick={() => openModal(talent)}
              />
              <h2 className="text-lg font-semibold">{talent.title}</h2>
              <p className="text-gray-500">{talent.user} - <span className="text-blue-500">{talent.category}</span></p>
              <p className="text-gray-400 text-sm">Submitted on {talent.submittedAt}</p>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openModal(talent)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex-1 mx-1"
                >
                  <FiEye /> Preview
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 Modal for Preview */}
      {selectedTalent && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-lg relative mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-2xl font-semibold mb-2">{selectedTalent.title}</h2>
          <p className="text-gray-500 mb-4">{selectedTalent.user} - <span className="text-blue-500">{selectedTalent.category}</span></p>
          <img src={selectedTalent.thumbnail} alt="Preview" className="w-full h-40 object-cover rounded-md mb-4" />
          <p className="text-gray-600">{selectedTalent.description || "No description provided."}</p>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => approveTalent(selectedTalent.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex-1 mx-1"
            >
              <FiCheck /> Approve
            </button>
            <button
              onClick={() => rejectTalent(selectedTalent.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex-1 mx-1"
            >
              <FiX /> Reject
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </Modal>
      )}
    </div>
  );
}
