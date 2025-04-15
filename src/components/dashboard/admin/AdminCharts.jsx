"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
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
import MostFollowedCard from "./users/MostFollowedCard";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AdminCharts() {
  const { getToken } = useAuth();
  async function fetchTalentPerCategoties() {
    const token = await getToken();
    try {
      const res = await fetch("/api/stats/talents-per-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error Fetching Talents Per Category");
    }
  }
  const {
    data: chartData,
    error: talentPerCategoryError,
    isLoading: loadingTalentsPerCategory,
  } = useQuery({
    queryKey: ["TalentsPerCategories"],
    queryFn: fetchTalentPerCategoties,
  });
  async function fetchMostFollowedUser() {
    try {
      const res = await fetch("/api/stats/most-followed-users");
      return await res.json();
    } catch (error) {
      console.log("Error on fetching followed users", error);
      toast.error("Errror Fetching followed users");
    }
  }
  const {
    data: topFollowedUsers,
    error: topFollowedUserError,
    isLoading: loadingTopFollowedUsers,
  } = useQuery({
    queryKey: ["TopFollowedUsers"],
    queryFn: fetchMostFollowedUser,
  });
  if (talentPerCategoryError) {
    console.log("Error Fetching Chart Data of Talents Per Categories");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* Bar Chart */}
      <div className="bg-white shadow rounded">
        <h2 className="md:text-xl font-semibold tracking-wider mb-2 px-3 py-2 border-b">
          Number of talents per Categories
        </h2>
        {loadingTalentsPerCategory ? (
          <div className=" w-[500px] h-[00px] e shadow-md p-6 rounded-lg animate-pulse">
            <div className="bg-gray-300 rounded w-full h-full"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.data}>
              <XAxis dataKey="_id" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="shadow bg-white rounded">
        <h1 className="flex items-center border-b px-3 py-2 gap-4 md:text-xl font-semibold ">
          <FiTrendingUp className="text-red-600" />
          <span className="tracking-wider">Top Followed Users</span>
        </h1>
        <div className="grid grid-cols-[10px_1fr_2fr_20px_1fr] gap-3 text-xs sm:text-base font-semibold py-1">
          <span></span>
          <span>Name</span>
          <span>Email</span>
          <span className="flex items-center justify-center">No.</span>
          <span className="flex items-center justify-center">Actions</span>
        </div>
        {loadingTopFollowedUsers ? (
          <div className=" w-[500px] h-[300px] e shadow-md p-6 rounded-lg animate-pulse">
            <div className="bg-gray-300 rounded w-full h-full"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full py-2 transition-all duration-300">
            {topFollowedUsers?.data.map((data, index) => (
              <MostFollowedCard key={data._id} data={data} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Pie Chart */}
      {/* <div className="bg-white shadow-lg p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">User & Talent Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="_id"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

export default AdminCharts;
