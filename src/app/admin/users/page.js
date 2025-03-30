// src/app/admin/users/page.jsx
"use client";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiEye } from "react-icons/fi";
import SearchUsers from "@/components/dashboard/admin/users/SearchUsers";
import NoDataFound from "@/components/dashboard/admin/users/NoDataFound ";
import { useAuth } from "@clerk/nextjs";

export default function UserManagement() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");
  // Fetch user data
  async function fetchUsers() {
    try {
      const token = await getToken();
      const res = await fetch("/api/me?limit=", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.log("Error fetching Users", error);
    }
  }
    useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold ">Users</h1>
      <SearchUsers setQuery={setQuery} query={query} />

      <div className="overflow-x-auto">
        {/* ✅ Scrollable wrapper */}
        <table className="w-full min-w-[600px] border-collapse border border-gray-300 rounded text-xs md:text-sm">
          <thead>
            <tr className=" bg-stone-100 border border-collapse ">
              <th className="border p-2 text-start">Name</th>
              <th className="border p-2 text-start">Email</th>
              <th className="border p-2 text-start">Role</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-start border-b border-r hover:bg-gray-100"
              >
                <td className="border-r p-2 flex items-center gap-2">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </td>
                <td className="border-r p-2">{user.email}</td>
                <td className="border-r p-2">{user.role}</td>
                <td className="border-r p-2 flex items-center justify-center gap-4">
                  <button className="text-blue-500 hover:underline">
                    <FiEye />
                  </button>
                  <button className="text-blue-500 hover:underline">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
