"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AdminCharts() {
  const { getToken } = useAuth();
  const [chartData, setChartData] = useState([]);
  async function fetchTalentPerCategoties() {
    const token = await getToken();
    try {
      const res = await fetch("/api/stats/talents-per-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data.data);
      setChartData(data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    fetchTalentPerCategoties();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* Bar Chart */}
      <div className="bg-white shadow-lg p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">
          Number of talents per Categories
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="_id" stroke="#555" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
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
