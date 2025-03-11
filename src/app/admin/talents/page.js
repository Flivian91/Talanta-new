// src/app/admin/talents/page.jsx
"use client";
import { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { db } from "@/utils/appwrite";

export default function TalentManagement() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTalents() {
      try {
        const response = await db.listDocuments("database_id", "talents_collection");
        setTalents(response.documents);
      } catch (error) {
        console.error("Error fetching talents:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTalents();
  }, []);

  async function approveTalent(talentId) {
    try {
      await db.updateDocument("database_id", "talents_collection", talentId, {
        approved: true,
      });
      setTalents(
        talents.map((talent) =>
          talent.$id === talentId ? { ...talent, approved: true } : talent
        )
      );
    } catch (error) {
      console.error("Failed to approve talent:", error);
    }
  }

  async function rejectTalent(talentId) {
    try {
      await db.deleteDocument("database_id", "talents_collection", talentId);
      setTalents(talents.filter((talent) => talent.$id !== talentId));
    } catch (error) {
      console.error("Failed to reject talent:", error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Talent Management</h1>
      {loading ? (
        <p>Loading talents...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {talents.map((talent) => (
              <tr key={talent.$id} className="text-center">
                <td className="border p-2">{talent.title}</td>
                <td className="border p-2">{talent.userId}</td>
                <td className="border p-2">{talent.approved ? "Approved" : "Pending"}</td>
                <td className="border p-2 flex justify-center gap-4">
                  {!talent.approved && (
                    <button onClick={() => approveTalent(talent.$id)} className="text-green-500 hover:underline">
                      <FiCheck />
                    </button>
                  )}
                  <button onClick={() => rejectTalent(talent.$id)} className="text-red-500 hover:underline">
                    <FiX />
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
