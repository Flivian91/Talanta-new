import { useApprovedTalentsCount } from "@/hooks/useApprovedTalentsCount";
import { useRejectedTalentsCount } from "@/hooks/useRejectedTalentsCount";
import { useTalentsCOunt } from "@/hooks/useTalentCount";
import { useUserCount } from "@/hooks/useUserCount";
import React from "react";

function AdminReportSummaryCards() {
  const {
    data: userCount,
    error: userCountError,
    isLoading: loadingUserCount,
  } = useUserCount();
  const {
    data: talentsCount,
    error: talentsCountError,
    isLoading: loadingTalentsCount,
  } = useTalentsCOunt();
  // Approved Talents Count
  const {
    data: approvedTalentsCount,
    error: approvedTalentsCountError,
    isLoading: loadingApprovedTalentsCount,
  } = useApprovedTalentsCount();
  const {
    data: rejectedTalentsCount,
    error: rejectedTalentsCountError,
    isLoading: loadingRejectedTalentsCount,
  } = useRejectedTalentsCount();
  if(userCountError){
    console.error("Error fetching User Count")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {loadingUserCount ? (
        <div className="bg-gray-200 rounded animate-pulse h-20 p-2 flex flex-col gap-2">
          <div className="bg-gray-100 w-full h-6 rounded"></div>
          <div className="bg-gray-100 w-1/3 h-6 rounded"></div>
        </div>
      ) : (
        <StatCard
          title="Total Users"
          count={userCount?.data}
          color="bg-blue-500"
        />
      )}
      {loadingTalentsCount ? (
        <div className="bg-gray-200 rounded animate-pulse h-20 p-2 flex flex-col gap-2">
          <div className="bg-gray-100 w-full h-6 rounded"></div>
          <div className="bg-gray-100 w-1/3 h-6 rounded"></div>
        </div>
      ) : (
        <StatCard
          title="Total Talents"
          count={talentsCount?.data}
          color="bg-green-500"
        />
      )}
      {loadingApprovedTalentsCount ? (
        <div className="bg-gray-200 rounded animate-pulse h-20 p-2 flex flex-col gap-2">
          <div className="bg-gray-100 w-full h-6 rounded"></div>
          <div className="bg-gray-100 w-1/3 h-6 rounded"></div>
        </div>
      ) : (
        <StatCard
          title="Approved Talents"
          count={approvedTalentsCount?.data}
          color="bg-purple-500"
        />
      )}
      {loadingRejectedTalentsCount ? (
        <div className="bg-gray-200 rounded animate-pulse h-20 p-2 flex flex-col gap-2">
          <div className="bg-gray-100 w-full h-6 rounded"></div>
          <div className="bg-gray-100 w-1/3 h-6 rounded"></div>
        </div>
      ) : (
        <StatCard
          title="Pending Approvals"
          count={rejectedTalentsCount?.data}
          color="bg-yellow-500"
        />
      )}
      
    </div>
  );
}
// 📌 Statistic Card Component
const StatCard = ({ title, count, color }) => (
  <div className={`p-6 ${color} text-white rounded  shadow`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl">{count}</p>
  </div>
);

export default AdminReportSummaryCards;
