import React from "react";
function StatsAdminCard({ title, count, icon, bgColor }) {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg flex items-center gap-4 ${bgColor}`}
    >
      <div className="text-4xl text-white">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-3xl font-bold text-white">{count}</p>
      </div>
    </div>
  );
}
export default StatsAdminCard;
