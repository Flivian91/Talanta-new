"use client";
import { useUser } from "@clerk/nextjs";

function WelcomeAdmin() {
  const { user, isLoaded } = useUser();

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold tracking-wide">Dashboard</h2>
      {isLoaded ? (
        <p className="text-sm tracking-wide font-medium text-gray-500">
          Hello, {user?.firstName || user?.lastName}. Welcome back to Talanta
          Admin.{" "}
        </p>
      ) : (
        <p className="h-8 w-40 md:w-52 bg-gray-200 animate-pulse rounded"></p>
      )}
    </div>
  );
}

export default WelcomeAdmin;
