import React from "react";
import { FiCheck, FiUser, FiX } from "react-icons/fi";

function AdminTalentTable({displayedTalents}) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-sm">
      <table className="w-full min-w-[600px] border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedTalents.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-600">
                No talents found.
              </td>
            </tr>
          ) : (
            displayedTalents.map((talent) => (
              <tr
                key={talent.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{talent.title}</td>
                <td className="p-3 flex items-center gap-2">
                  <FiUser className="text-gray-500" />
                  <span>{talent.userId}</span>
                </td>
                <td className="p-3">
                  {talent.approved ? (
                    <span className="text-green-600 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-4">
                  {!talent.approved && (
                    <button
                      onClick={() => approveTalent(talent.$id)}
                      className="text-green-600 hover:bg-green-100 px-3 py-2 rounded-md transition"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => rejectTalent(talent.$id)}
                    className="text-red-600 hover:bg-red-100 px-3 py-2 rounded-md transition"
                  >
                    <FiX size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTalentTable;
