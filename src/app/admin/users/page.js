// src/app/admin/users/page.jsx
"use client";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiEye } from "react-icons/fi";
import SearchUsers from "@/components/dashboard/admin/users/SearchUsers";
import NoDataFound from "@/components/dashboard/admin/users/NoDataFound ";
import { useAuth } from "@clerk/nextjs";
import UserHeader from "@/components/dashboard/admin/users/UserHeader";
import UsersGridArea from "@/components/layouts/UsersGridArea";
import Pagination from "@/components/common/Pagination";

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
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data.data.data);
      setFilteredUsers(data.data.data); // 👈 Set both
    } catch (error) {
      console.log("Error fetching Users", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  function handleSearch(q) {
    if (q.trim().length < 2) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    setFilteredUsers(filtered);
  }

  useEffect(() => {
    handleSearch(query);
  }, [query, users]); // also react when users change

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <UserHeader query={query} setQuery={setQuery} onFetch={fetchUsers} />
      {filteredUsers.length === 0 ? (
        <NoDataFound resetSearch={() => setQuery("")} />
      ) : (
        <UsersGridArea data={filteredUsers} />
      )}
      {filteredUsers.length !== 0 && <Pagination />}
    </div>
  );
}
