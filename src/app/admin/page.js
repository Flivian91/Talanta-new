"use client";
import { databases } from "@/utils/appwriteClient";
import { useEffect, useState } from "react";
import { FiUsers, FiVideo } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTalents: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const users = 20;
        const talents = 30;
        const pending = 5;

        setStats({
          totalUsers: users,
          totalTalents: talents,
          pendingApprovals: pending,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    }

    fetchStats();
  }, []);

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Talents", value: stats.totalTalents },
    { name: "Pending", value: stats.pendingApprovals },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ff7300"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Users" count={stats.totalUsers} icon={<FiUsers />} />
        <StatCard title="Total Talents" count={stats.totalTalents} icon={<FiVideo />} />
        <StatCard
          title="Pending Approvals"
          count={stats.pendingApprovals}
          icon={<MdOutlinePendingActions />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Talent Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User & Talent Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, count, icon }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg flex items-center gap-4 hover:shadow-xl transition-all">
    <div className="text-4xl text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{count}</p>
    </div>
  </div>
);
