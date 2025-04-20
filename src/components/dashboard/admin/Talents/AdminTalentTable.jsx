import { useSingleUser } from "@/hooks/useSingleUser";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { FiCheck, FiUser, FiX } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";

function AdminTalentTable({ displayedTalents }) {
  // Get User with Cleck ID as shown
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
          {displayedTalents?.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-600">
                No talents found.
              </td>
            </tr>
          ) : (
            displayedTalents.map((talent) => (
              <tr
                key={talent._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{talent.title}</td>
                <UserName user={talent} />

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

// User name
function UserName({ user }) {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function loadToken() {
      const t = await getToken();
      setToken(t);
    }
    loadToken();
  }, [getToken]);
  const { data } = useSingleUser(token, "user_2vzDfJd6VYcQz9h4LW0u0XSERqZ");
  console.log(data);
  

  return (
    <td className="p-3 flex items-center gap-2">
      <FiUser className="text-gray-500" />
      <span>{data?.data.firstName}</span>
    </td>
  );
}
