import { useTalentsCOunt } from "@/hooks/useTalentCount";
import React from "react";

function AdminReportSummaryCards() {
  const {
    data: userCount,
    error: userCountError,
    isLoading: lodingUserCount,
  } = useTalentsCOunt();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatCard
        tit le="Total Users"
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
  );
}
// 📌 Statistic Card Component
const StatCard = ({ title, count, color }) => (
  <div className={`p-6 ${color} text-white rounded-lg shadow-lg`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl">{count}</p>
  </div>
);

export default AdminReportSummaryCards;
