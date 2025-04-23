import React from "react";
import { Pie } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import { Cell, PieChart, ResponsiveContainer } from "recharts";

function AdminReportUserPerCategory({ filter, talentsPerCategory, loading }) {
  return (
    <div>
      {filter === "all" || filter === "categories" ? (
        <div className="bg-white shadow-lg py-6 px-2 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Talent Distribution by Category
          </h2>
          {loading ? (
            <div className="animate-pulse bg-gray-200 py-20 rounded"></div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={talentsPerCategory?.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  dataKey="value"
                  label
                >
                  {talentsPerCategory?.data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default AdminReportUserPerCategory;
