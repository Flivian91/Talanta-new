import React from "react";
import StatsAdminCard from "./StatsAdminCard";
import { FiCheckCircle, FiUsers, FiVideo } from "react-icons/fi";
import { MdPendingActions } from "react-icons/md";

function StatsAdminLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  w-full">
      <StatsAdminCard
        title="Total Users"
        count={300}
        icon={<FiUsers />}
        bgColor="bg-blue-500"
      />
      <StatsAdminCard
        title="Total Talents"
        count={400}
        icon={<FiVideo />}
        bgColor="bg-green-500"
      />
      <StatsAdminCard
        title="Approved Talents"
        count={23}
        icon={<FiCheckCircle />}
        bgColor="bg-purple-500"
      />
      <StatsAdminCard
        title="Pending Approval"
        count={3}
        icon={<MdPendingActions />}
        bgColor="bg-orange-500"
      />
    </div>
  );
}

export default StatsAdminLayout;
