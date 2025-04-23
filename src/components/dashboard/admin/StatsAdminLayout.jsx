"use client";
import React from "react";
import StatsAdminCard from "./StatsAdminCard";
import { FiCheckCircle, FiUsers, FiVideo } from "react-icons/fi";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingAdminSkeleton from "@/components/common/LoadingAdminSkeleton";
import { useUserCount } from "@/hooks/useUserCount";
import { useTalentsCOunt } from "@/hooks/useTalentCount";
import { useCategoriesCount } from "@/hooks/useCategoriesCount";

function StatsAdminLayout() {
  const { getToken } = useAuth();
  // Fetch Number of users
  const {
    data: userCount,
    isLoading: loadingUsersCount,
    error: userError,
  } = useUserCount();
  // Fetch Number of talents
  const {
    data: talentsCount,
    isLoading: loadingTalentCount,
    error: talentError,
  } = useTalentsCOunt();
  // Fetch Number of Categories
  const {
    data: categoriesCount,
    error: categoriesError,
    isLoading: loadingCategoriesCount,
  } = useCategoriesCount();
  if (userError) {
    console.log("Error Fetching Users Count.");
  }
  if (talentError) {
    console.log("Error Fetching Talents Count.");
  }
  if (categoriesError) {
    console.log("Error Fecthing Categories Count.");
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  w-full">
      {loadingUsersCount ? (
        <LoadingAdminSkeleton />
      ) : (
        <StatsAdminCard
          title="Total Users"
          link={"/admin/users"}
          count={userCount?.data}
          icon={<FiUsers />}
          bgColor="bg-blue-500"
        />
      )}
      {loadingTalentCount ? (
        <LoadingAdminSkeleton />
      ) : (
        <StatsAdminCard
          title="Total Talents"
          link={"/admin/talents"}
          count={talentsCount?.data}
          icon={<FiVideo />}
          bgColor="bg-green-500"
        />
      )}
      {loadingCategoriesCount ? (
        <LoadingAdminSkeleton />
      ) : (
        <StatsAdminCard
          title="Total Categories"
          link={"/admin/categories"}
          count={categoriesCount?.data}
          icon={<FiCheckCircle />}
          bgColor="bg-purple-500"
        />
      )}
    </div>
  );
}

export default StatsAdminLayout;
