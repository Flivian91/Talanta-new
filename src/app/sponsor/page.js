"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { FiUsers, FiMessageSquare, FiClock } from "react-icons/fi";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      <GetTokenButton />
      <h1 className="text-3xl font-bold mb-6">Sponsor Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard
          title="Talents Supported"
          count={stats.supportedTalents}
          icon={<FiUsers />}
          link={"/sponsor/discover"}
        />
        <StatCard
          title="Pending Sponsorships"
          count={stats.pendingRequests}
          icon={<FiClock />}
          link={"/sponsor/sponsorships"}
        />
        <StatCard
          title="New Messages"
          count={stats.newMessages}
          icon={<FiMessageSquare />}
          link={"/sponsor/messages"}
        />
      </div>

      {/* Charts Section */}
      <div className="mt-6 bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">
          Talents Supported Over Time
        </h2>
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

const StatCard = ({ title, count, icon, link }) => (
  <Link
    href={link}
    className="bg-white shadow p-6 rounded flex items-center lg:p-2  gap-4"
  >
    <div className="text-4xl text-blue-500">{icon}</div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-mono">{count}</p>
    </div>
    <button className="text-xl p-2 hover:bg-gray-100/70 rounded-sm">
      <LiaExternalLinkAltSolid />
    </button>
  </Link>
);

function GetTokenButton() {
  const { getToken } = useAuth();

  async function fetchToken() {
    const token = await getToken(); // Retrieve the Bearer Token
    console.log("Your Bearer Token:", token);
  }

  return (
    <button onClick={fetchToken} className="p-2 bg-blue-500 text-white">
      Get Token
    </button>
  );
}
