import { Legend } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function AdminReportUserPerMonth({ filter, userPerMonth, loading }) {
  return (
    <div>
      {filter === "all" || filter === "users" ? (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            User Monthly Growth
          </h2>
          {loading ? (
            <div className="animate-pulse bg-gray-200 py-20 rounded"></div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userPerMonth?.data}>
                <XAxis dataKey="_id" stroke="#555" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default AdminReportUserPerMonth;
