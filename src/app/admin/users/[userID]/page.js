"use client";
import { BsArrowLeft } from "react-icons/bs";
import AdminUserAction from "@/components/dashboard/admin/users/AdminUserAction";
import AdminUserHeader from "@/components/dashboard/admin/users/AdminUserHeader";
import AdminUserInformations from "@/components/dashboard/admin/users/AdminUserInformations";
import AdminUserMinorDetails from "@/components/dashboard/admin/users/AdminUserMinorDetails";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import ProfileSkeleton from "@/components/common/ProfileSkeleton";
import { useEffect } from "react";

export default function Page() {
  const { userID } = useParams();
  const { getToken } = useAuth();
  const { back } = useRouter();

  // Fetch single user data
  async function fetchUserData() {
    try {
      const token = await getToken();
      const res = await fetch(`/api/users/${userID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to Get User");
      return await res.json();
    } catch (error) {
      console.error("Error fetching user data", error.message);
    }
  }
  const {
    data: user,
    isLoading,
    error: userError,
  } = useQuery({
    queryKey: ["SingleUser"],
    queryFn: fetchUserData,
  });
  if (userError) {
    console.log("Failed to fetch User Data");
  }
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 border-b border-gray-300/60 py-2">
          {/* Navigate back */}
          <div>
            <button
              onClick={() => back()}
              className="flex items-center gap-2 border border-gray-300 px-2 py-1 rounded text-gray-600 text-sm hover:shadow"
            >
              <BsArrowLeft />
              <span className="text-sm font-semibold">Back</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <AdminUserHeader user={user?.data} />
            <AdminUserAction userID={userID} user={user?.data} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_300px]  gap-3">
          <AdminUserInformations data={user?.data} userID={userID} />
          <AdminUserMinorDetails user={user?.data} />
        </div>
      </div>
    </div>
  );
}
