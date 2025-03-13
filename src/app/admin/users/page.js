// src/app/admin/users/page.jsx
"use client";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiEye } from "react-icons/fi";
import { databases } from "@/utils/appwriteClient";
import users from "@/components/data/users";
import SearchUsers from "@/components/dashboard/admin/users/SearchUsers";
import NoDataFound from "@/components/dashboard/admin/users/NoDataFound ";

export default function UserManagement() {
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       const response = await databases.listDocuments("database_id", "users_collection");
  //       setUsers(response.documents);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  // async function deleteUser(userId) {
  //   try {
  //     await databases.deleteDocument("database_id", "users_collection", userId);
  //     setUsers(users.filter((user) => user.$id !== userId));
  //   } catch (error) {
  //     console.error("Failed to delete user:", error);
  //   }
  // }

  function handleSearchUsers(q = "a") {
    if (q.length < 1) {
      setFilteredUsers(users);
    } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  }
  useEffect(
    function () {
      handleSearchUsers(query);
    },
    [query]
  );

  return (
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold ">Users</h1>
    <SearchUsers setQuery={setQuery} query={query} />
  
    {filteredUsers.length === 0 ? (
      <NoDataFound resetSearch={() => setQuery("")} />
    ) : (
      <div className="overflow-x-auto"> {/* ✅ Scrollable wrapper */}
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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="text-start border-b border-r hover:bg-gray-100"
              >
                <td className="border-r p-2">{user.name}</td>
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
                    onClick={() => deleteUser(user.$id)}
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
    )}
  </div>
  
  );
}
