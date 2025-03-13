"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiX, FiUser, FiSearch } from "react-icons/fi";
import { allTalents } from "@/components/data/talents";
import ReactPaginate from "react-paginate";

export default function TalentManagement() {
  const [talents, setTalents] = useState(allTalents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const talentsPerPage = 5; // Adjust per page limit

  // ✅ Search Function
  const filteredTalents = talents.filter(
    (talent) =>
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
  const pageCount = Math.ceil(finalTalents.length / talentsPerPage);
  const displayedTalents = finalTalents.slice(
    currentPage * talentsPerPage,
    (currentPage + 1) * talentsPerPage
  );

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
  function handleSubmit(e) {
    e.preventDefault();
  }
  useEffect(function(){
    handleSearch(query);
  }, [query])

  return (
    <div className="py-3 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Talent Management
      </h1>

      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex items-center border border-gray-300 rounded-sm p-2 w-full md:w-1/3"
        >
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search talents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </form>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* 🏆 Talent Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-sm">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTalents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-600">
                  No talents found.
                </td>
              </tr>
            ) : (
              displayedTalents.map((talent) => (
                <tr
                  key={talent.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{talent.title}</td>
                  <td className="p-3 flex items-center gap-2">
                    <FiUser className="text-gray-500" />
                    <span>{talent.userId}</span>
                  </td>
                  <td className="p-3">
                    {talent.approved ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-4">
                    {!talent.approved && (
                      <button
                        onClick={() => approveTalent(talent.$id)}
                        className="text-green-600 hover:bg-green-100 px-3 py-2 rounded-md transition"
                      >
                        <FiCheck size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => rejectTalent(talent.$id)}
                      className="text-red-600 hover:bg-red-100 px-3 py-2 rounded-md transition"
                    >
                      <FiX size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
      {finalTalents.length > talentsPerPage && (
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
        </div>
      )}
    </div>
  );
}
