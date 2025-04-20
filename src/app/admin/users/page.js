// src/app/admin/users/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import UserHeader from "@/components/dashboard/admin/users/UserHeader";
import UsersGridArea from "@/components/layouts/UsersGridArea";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import NoDataFound from "@/components/dashboard/admin/users/NoDataFound ";
import LoadingUserSkeleton from "@/components/common/LoadingUserSkeleton";

export default function UserManagement() {
  const { getToken } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const realOffset = (page - 1) * limit;

  // Fetch user data
  async function fetchUsers() {
    try {
      const token = await getToken();
      const res = await fetch(
        `/api/users?limit=${limit}&offset=${realOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await res.json();
    } catch (error) {
      console.log("Error fetching Users", error);
      throw new Error("Failed to fetch users");
    }
  }

  console.log(limit);

  const {
    data: users,
    isLoading: loadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["Users", limit, page],
    queryFn: fetchUsers,
    keepPreviousData: true, // Optional: Keeps the last page while loading new one
  });

  // Search and filter logic
  function handleSearch(q) {
    if (!users?.data?.data) return;

    if (q.trim().length < 2) {
      setFilteredUsers(users.data.data);
      return;
    }

    const filtered = users.data.data.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    setFilteredUsers(filtered);
  }
  // Initialize filtered users and re-run filtering on query/user updates
  useEffect(() => {
    if (users?.data?.data) {
      handleSearch(query);
    }
  }, [query, users]);
  useEffect(() => {
    setPage(1); // reset to first page if limit changes
  }, [limit]);

  if (usersError) {
    console.error("Failed to load users. Please try again");

    return (
      <div className="text-red-600 font-semibold">
        Failed to load users. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users Management</h1>

      <UserHeader query={query} setQuery={setQuery} onFetch={fetchUsers} />

      {loadingUsers ? (
        <>
          <LoadingUserSkeleton />
          <LoadingUserSkeleton />
          <LoadingUserSkeleton />
          <LoadingUserSkeleton />
          <LoadingUserSkeleton />
          <LoadingUserSkeleton />
        </>
      ) : filteredUsers?.length === 0 ? (
        <NoDataFound resetSearch={() => setQuery("")} />
      ) : (
        <>
          <UsersGridArea data={filteredUsers} loading={loadingUsers} />
          <Pagination
            limit={limit}
            setLimit={setLimit}
            total={users?.data?.totalCount || 0}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
