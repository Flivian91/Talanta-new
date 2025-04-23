"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiX, FiSearch, FiEye } from "react-icons/fi";
import pendingTalentsData from "@/components/data/pandingTalents";
import AdminPendingHeader from "@/components/dashboard/admin/pending/AdminPendingHeader";
import AdminPreviewModel from "@/components/dashboard/admin/pending/AdminPreviewModel";
import AdminPendingCard from "@/components/dashboard/admin/pending/AdminPendingCard";
import AdminPendingSkeleton from "@/components/dashboard/admin/pending/AdminPendingSkeleton";
import { useTalents } from "@/hooks/useTalents";

export default function PendingApprovalsPage() {
  const [query, setQuery] = useState("");
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch Pending Approval Talents
  const {
    data: pendingTalents,
    error,
    isLoading,
  } = useTalents({ status: false });

  // ✅ Search Function

  const filteredTalents = pendingTalents?.data?.filter(
    (talent) =>
      talent.title.toLowerCase().includes(query.toLowerCase()) ||
      talent.description.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Approve Talent
  function approveTalent(id) {
    closeModal();
    alert("Talent Approved!");
  }

  // ✅ Reject Talent
  function rejectTalent(id) {
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
      {isLoading ? (
        <AdminPendingSkeleton />
      ) : (
        <AdminPendingCard
          filteredTalents={filteredTalents}
          openModal={openModal}
        />
      )}

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
