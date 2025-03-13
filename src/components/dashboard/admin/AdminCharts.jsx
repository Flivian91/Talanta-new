import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AdminCharts() {
  const chartData = [
    { name: "Users", value: 30 },
    { name: "Talents", value: 40 },
    { name: "Approved", value:30},
    { name: "Pending", value: 40 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Bar Chart */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Talent Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#555" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Pie Chart */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">User & Talent Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminCharts;
