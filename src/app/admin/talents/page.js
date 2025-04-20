"use client";
import { useEffect, useState } from "react";
import AdminTalentHeader from "@/components/dashboard/admin/Talents/AdminTalentHeader";
import AdminTalentTable from "@/components/dashboard/admin/Talents/AdminTalentTable";
import Pagination from "@/components/common/Pagination";
import LoadingTalentSkeleton from "@/components/common/LoadingTalentSkeleton";
import { toast } from "react-toastify";
import { useTalents } from "@/hooks/useTalents";
import { useAuth } from "@clerk/nextjs";
import { useTalentsCOunt } from "@/hooks/useTalentCount";

export default function TalentManagement() {
  // const [talents, setTalents] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // Fetch Talents Data
  const { data: talents, isLoading, error } = useTalents({ limit, page });
  // Total talents Count
  const { data: talentCount } = useTalentsCOunt();

  // ✅ Search Function
  const filteredTalents = talents?.data.filter((talent) =>
    talent.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Filtering Function
  const finalTalents =
    filter === "all"
      ? filteredTalents
      : filteredTalents?.filter((talent) => {
          return filter === "approved" ? talent.approved : !talent.approved;
        });

  useEffect(() => {
    setPage(1);
  }, [limit]);
  if (isLoading) {
    return <LoadingTalentSkeleton />;
  }
  if (error) {
    console.log("Failed to fetch Talents");
    toast.error("Failed to fetch Talents");
  }

  return (
    <div className="py-3 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Talent Management
      </h1>

      {/* 🔍 Search & Filter Section */}
      <AdminTalentHeader
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      />

      {/* 🏆 Talent Table */}
      <AdminTalentTable displayedTalents={finalTalents} />

      {/* 📌 Pagination */}
      <Pagination
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        total={talentCount?.data}
      />
    </div>
  );
}
