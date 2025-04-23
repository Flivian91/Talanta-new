import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import Modal from "react-modal";

function AdminPreviewModel({
  isModalOpen,
  closeModal,
  selectedTalent,
  approveTalent,
  rejectTalent,
}) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-lg relative mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold mb-2">{selectedTalent.title}</h2>
      <p className="text-gray-500 mb-4">
        {selectedTalent.user} -{" "}
        <span className="text-blue-500">{selectedTalent.category}</span>
      </p>
      <img
        src={selectedTalent.thumbnail}
        alt="Preview"
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <p className="text-gray-600">
        {selectedTalent.description || "No description provided."}
      </p>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => approveTalent(selectedTalent.id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex-1 mx-1"
        >
          <FiCheck />
          <span>Approve</span>
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
        <FaTimes />
      </button>
    </Modal>
  );
}

export default AdminPreviewModel;
