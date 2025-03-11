// src/app/admin/users/page.jsx
"use client";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { databases } from "@/utils/appwriteClient";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await databases.listDocuments("database_id", "users_collection");
        setUsers(response.documents);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function deleteUser(userId) {
    try {
      await databases.deleteDocument("database_id", "users_collection", userId);
      setUsers(users.filter((user) => user.$id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.$id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 flex justify-center gap-4">
                  <button className="text-blue-500 hover:underline">
                    <FiEdit />
                  </button>
                  <button onClick={() => deleteUser(user.$id)} className="text-red-500 hover:underline">
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
