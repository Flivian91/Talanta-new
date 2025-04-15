"use client";
import React, { useEffect, useState } from "react";
import StatsAdminCard from "./StatsAdminCard";
import { FiCheckCircle, FiUsers, FiVideo } from "react-icons/fi";
import { MdPendingActions } from "react-icons/md";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function StatsAdminLayout() {
  const { getToken } = useAuth();
  // Fetch Number of users
  async function fetchUsers() {
    try {
      const token = await getToken();
      const res = await fetch("/api/me/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch users");
    }
  }
  const {
    data: userCount,
    isLoading: loadingUsersCount,
    error: userError,
  } = useQuery({ queryKey: ["Users"], queryFn: fetchUsers });

  // Fetch Number of talents
  async function fetchTalents() {
    try {
      const token = await getToken();
      const res = await fetch("/api/talents/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch talents");
    }
  }
  const {
    data: talentsCount,
    isLoading: loadingTalentCount,
    error: talentError,
  } = useQuery({ queryKey: ["Talents"], queryFn: fetchTalents });
  console.log(talentsCount);

  // Fetch Number of Categories

  async function fetchCategories() {
    try {
      const token = await getToken();
      const res = await fetch("/api/categories/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch talents");
    }
  }
  const {
    data: categoriesCount,
    error: categoriesError,
    isLoading: loadingCategoriesCount,
  } = useQuery({ queryKey: ["Categories"], queryFn: fetchCategories });
  if (userError) {
    toast.error("Error Fetching Users Count.");
  }
  if (talentError) {
    toast.error("Error Fetching Talents Count.");
  }
  if(categoriesError){
    toast.error("Error Fecthing Categories Count.")
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  w-full">
      {loadingUsersCount ? (
        <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
          <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 rounded"></div>
        </div>
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
        <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
          <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 rounded"></div>
        </div>
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
        <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
          <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 rounded"></div>
        </div>
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
