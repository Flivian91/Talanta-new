"use client";
import React, { useEffect, useState } from "react";
import StatsAdminCard from "./StatsAdminCard";
import { FiCheckCircle, FiUsers, FiVideo } from "react-icons/fi";
import { MdPendingActions } from "react-icons/md";
import { useAuth } from "@clerk/nextjs";

function StatsAdminLayout() {
  const { getToken } = useAuth();
  const [numUsers, setNumUsers] = useState(0);
  const [numTalents, setNumTalents] = useState(0);

  // Fetch Number of users
  async function fetchUsers() {
    try {
      const token = await getToken();
      const res = await fetch("/api/me/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await res.json();

      setNumUsers(data || 0);
    } catch (error) {
      console.error("Failed to fetch users");
    }
  }

  // Fetch Number of talents
  async function fetchTalents() {
    try {
      const token = await getToken();
      const res = await fetch("/api/talents/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await res.json();
      setNumTalents(data || 0);
    } catch (error) {
      console.error("Failed to fetch talents");
    }
  }
  // Fetch Number of approved talents
  
  // Fetch Number of pending approval
  useEffect(() => {
    fetchUsers();
    fetchTalents();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  w-full">
      <StatsAdminCard
        title="Total Users"
        count={numUsers}
        icon={<FiUsers />}
        bgColor="bg-blue-500"
      />
      <StatsAdminCard
        title="Total Talents"
        count={numTalents}
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
