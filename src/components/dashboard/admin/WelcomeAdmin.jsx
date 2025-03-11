"use client";
import { useUser } from "@clerk/nextjs";

function WelcomeAdmin() {
  const { user } = useUser();
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold tracking-wide">Dashboard</h2>
      <p className="text-sm tracking-wide font-medium text-gray-500">
        Hello, {user?.firstName || user?.lastName}. Welcome back to Talanta Admin.{" "}
      </p>
    </div>
  );
}

export default WelcomeAdmin;
