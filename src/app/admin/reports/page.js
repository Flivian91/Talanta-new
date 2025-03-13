"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import reportData from "@/components/data/reportData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import
import { saveAs } from "file-saver";

export default function ReportAnalysisPage() {
  const [filter, setFilter] = useState("all");

  // ✅ Export to CSV
  function exportToCSV() {
    const csvRows = [
      ["Category", "Total"],
      ...reportData.categories.map((cat) => [cat.name, cat.value]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "report.csv");
  }

  // ✅ Export to PDF
  function exportToPDF() {
    const doc = new jsPDF();

    // ✅ Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Report & Analysis", 15, 15);

    // ✅ Add Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Generated on: " + new Date().toLocaleDateString(), 15, 25);

    // ✅ Add Table with Styling
    autoTable(doc, {
      startY: 35,
      head: [["Category", "Total"]],
      body: reportData.categories.map((cat) => [cat.name, cat.value]),
      theme: "striped",
      styles: { font: "helvetica", fontSize: 12 },
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] }, // Blue header
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray
    });

    // ✅ Add Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // ✅ Save File
    doc.save("Talanta-mines-weekely-report.pdf");
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Reports & Analysis
      </h1>

      {/* 📌 Filters & Export Options */}
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
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          count={reportData.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Talents"
          count={reportData.totalTalents}
          color="bg-green-500"
        />
        <StatCard
          title="Approved Talents"
          count={reportData.approvedTalents}
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Approvals"
          count={reportData.pendingApprovals}
          color="bg-yellow-500"
        />
      </div>

      {/* 📊 Conditional Charts */}
      {filter === "all" || filter === "monthly" ? (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Uploads</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.monthlyUploads}>
              <XAxis dataKey="month" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uploads" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      {filter === "all" || filter === "categories" ? (
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Talent Distribution by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.categories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {reportData.categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );
}

// 📌 Statistic Card Component
const StatCard = ({ title, count, color }) => (
  <div className={`p-6 ${color} text-white rounded-lg shadow-lg`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl">{count}</p>
  </div>
);
