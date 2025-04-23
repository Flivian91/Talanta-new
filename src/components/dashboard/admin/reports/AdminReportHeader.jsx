import React from "react";

function AdminReportHeader({ filter, setFilter, exportToCSV, exportToPDF }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <label className="mr-3 text-gray-600">Filter By:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="monthly">Monthly Uploads</option>
          <option value="categories">Category Insights</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => exportToCSV()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToPDF()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default AdminReportHeader;
