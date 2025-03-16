"use client";
import { useState } from "react";
import { FiUsers, FiMessageSquare, FiClock } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SponsorDashboard() {
  const [stats, setStats] = useState({
    supportedTalents: 12,
    pendingRequests: 3,
    newMessages: 5,
  });

  const talentData = [
    { name: "Jan", talents: 3 },
    { name: "Feb", talents: 5 },
    { name: "Mar", talents: 7 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sponsor Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Talents Supported" count={stats.supportedTalents} icon={<FiUsers />} />
        <StatCard title="Pending Sponsorships" count={stats.pendingRequests} icon={<FiClock />} />
        <StatCard title="New Messages" count={stats.newMessages} icon={<FiMessageSquare />} />
      </div>

      {/* Charts Section */}
      <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Talents Supported Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={talentData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="talents" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const StatCard = ({ title, count, icon }) => (
  <div className="bg-white shadow p-6 rounded-lg flex items-center gap-4">
    <div className="text-4xl text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{count}</p>
    </div>
  </div>
);
