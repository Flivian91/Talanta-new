"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiX, FiUser } from "react-icons/fi";
import { allTalents } from "@/components/data/talents";
import ReactPaginate from "react-paginate";
import AdminTalentHeader from "@/components/dashboard/admin/Talents/AdminTalentHeader";
import AdminTalentTable from "@/components/dashboard/admin/Talents/AdminTalentTable";
import Pagination from "@/components/common/Pagination";

export default function TalentManagement() {
  const [talents, setTalents] = useState(allTalents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // const [currentPage, setCurrentPage] = useState(0);
  // const talentsPerPage = 5; // Adjust per page limit

  // ✅ Search Function
  const filteredTalents = talents.filter((talent) =>
    talent.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Filtering Function
  const finalTalents =
    filter === "all"
      ? filteredTalents
      : filteredTalents.filter((talent) => {
          return filter === "approved" ? talent.approved : !talent.approved;
        });

  // ✅ Pagination Logic
  function handleSearch(q) {
    if (q.length < 1) {
      setTalents(allTalents);
    } else {
      setTalents(
        allTalents.filter((talent) =>
          talent.title.toLowerCase().includes(q.toLowerCase())
        )
      );
    }
  }

  useEffect(
    function () {
      handleSearch(query);
    },
    [query]
  );
  useEffect(() => {
    setPage(1);
  }, [limit]);

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
        total={30}
      />
      {/* 
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName="flex gap-2 text-sm"
          pageLinkClassName="px-3 py-1 border rounded-md hover:bg-blue-100"
          previousLinkClassName="px-3 py-1 border rounded-md hover:bg-blue-100"
          nextLinkClassName="px-3 py-1 border rounded-md hover:bg-blue-100"
          activeClassName="bg-blue-500 text-white"
        />
      </div> */}
    </div>
  );
}
