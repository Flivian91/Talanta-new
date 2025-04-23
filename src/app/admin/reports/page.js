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
import AdminReportSummaryCards from "@/components/dashboard/admin/reports/AdminReportSummaryCards";
import AdminReportHeader from "@/components/dashboard/admin/reports/AdminReportHeader";
import { useTalentsPerCategory } from "@/hooks/useTalentsPerCategory";
import AdminReportUserPerCategory from "@/components/dashboard/admin/reports/AdminReportUserPerCategory";
import { useUserPerMonth } from "@/hooks/useUserPerMonth";
import AdminReportUserPerMonth from "@/components/dashboard/admin/reports/AdminReportUserPerMonth";

export default function ReportAnalysisPage() {
  const [filter, setFilter] = useState("all");
  // Fetch Talents Per Category
  const {
    data: talentsPerCategory,
    isLoading: loadingTalentsPerCategory,
    error: talentsPerCategoryError,
  } = useTalentsPerCategory();
  const {
    data: userPerMonth,
    error: userPerMonthError,
    isLoading: loadingUserPerMonth,
  } = useUserPerMonth();
  console.log(userPerMonth?.data);

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
      <AdminReportHeader
        filter={filter}
        setFilter={setFilter}
        exportToCSV={exportToCSV}
        exportToPDF={exportToPDF}
      />

      {/* 📊 Summary Cards */}
      <AdminReportSummaryCards />

      {/* 📊 Conditional Charts */}
      <AdminReportUserPerMonth
        filter={filter}
        userPerMonth={userPerMonth}
        loadin={loadingUserPerMonth}
      />

      <AdminReportUserPerCategory
        filter={filter}
        talentsPerCategory={talentsPerCategory}
        loading={loadingTalentsPerCategory}
      />
    </div>
  );
}
