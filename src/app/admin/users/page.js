// src/app/admin/users/page.jsx
"use client";
import { useEffect, useState } from "react";
import NoDataFound from "@/components/dashboard/admin/users/NoDataFound ";
import { useAuth } from "@clerk/nextjs";
import UserHeader from "@/components/dashboard/admin/users/UserHeader";
import UsersGridArea from "@/components/layouts/UsersGridArea";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UserManagement() {
  const { getToken } = useAuth();
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

      return await res.json();
    } catch (error) {
      console.log("Error fetching Users", error);
    }
  }
  const {
    data: users,
    isLoading: loadingUsers,
    error: usersError,
  } = useQuery({ queryKey: ["Users"], queryFn: fetchUsers });
  console.log(users?.data?.data);
  

  function handleSearch(q) {
    if (q.trim().length < 2) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users?.data?.data.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    setFilteredUsers(filtered);
  }

  useEffect(() => {
    handleSearch(query);
  }, [query, users]); // also react when users change

  if (usersError) {
    console.error("Error Loading user");
  }
  console.log(filteredUsers);
  

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <UserHeader query={query} setQuery={setQuery} onFetch={fetchUsers} />
      {filteredUsers?.length === 0 ? (
        <NoDataFound resetSearch={() => setQuery("")} />
      ) : (
        <UsersGridArea data={filteredUsers} loading={loadingUsers} />
      )}
      {filteredUsers?.length !== 0 && <Pagination />}
    </div>
  );
}
