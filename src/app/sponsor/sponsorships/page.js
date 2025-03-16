"use client";
import { useState } from "react";
import { FiCheck, FiX, FiFilter, FiClock, FiUser } from "react-icons/fi";

const dummyRequests = [
  { id: 1, talent: "John Doe", category: "Dance", requestedAt: new Date(), status: "pending" },
  { id: 2, talent: "Jane Smith", category: "Music", requestedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000), status: "approved" },
  { id: 3, talent: "Mike Johnson", category: "Art", requestedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000), status: "rejected" },
  { id: 4, talent: "Sarah Lee", category: "Singing", requestedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000), status: "approved" },
];

export default function SponsorshipRequestsPage() {
  const [requests, setRequests] = useState(dummyRequests);
  const [filter, setFilter] = useState("all");

  function updateRequestStatus(id, newStatus) {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req)));
  }

  function handleFilterChange(status) {
    setFilter(status);
  }

  const filteredRequests = filter === "all" ? requests : requests.filter((req) => req.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sponsorship Requests</h1>

      {/* Filter Section */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => handleFilterChange("all")} className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          All
        </button>
        <button onClick={() => handleFilterChange("pending")} className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}>
          Pending
        </button>
        <button onClick={() => handleFilterChange("approved")} className={`px-4 py-2 rounded-md ${filter === "approved" ? "bg-green-500 text-white" : "bg-gray-200"}`}>
          Approved
        </button>
        <button onClick={() => handleFilterChange("rejected")} className={`px-4 py-2 rounded-md ${filter === "rejected" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
          Rejected
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="border p-3 text-left">Talent</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Requested At</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="border-r p-3 flex items-center gap-2">
                  <FiUser className="text-blue-500" /> {req.talent}
                </td>
                <td className="border-r p-3">{req.category}</td>
                <td className="border-r p-3 text-gray-600">{req.requestedAt.toDateString()}</td>
                <td className="border-r p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : req.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-4">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateRequestStatus(req.id, "approved")}
                        className="text-green-500 hover:underline"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => updateRequestStatus(req.id, "rejected")}
                        className="text-red-500 hover:underline"
                      >
                        <FiX />
                      </button>
                    </>
                  )}
                  {req.status === "approved" && <FiCheck className="text-green-500" />}
                  {req.status === "rejected" && <FiX className="text-red-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
