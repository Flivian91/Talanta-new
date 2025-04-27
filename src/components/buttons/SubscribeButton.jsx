"use client";

import React from "react";
import { IoNotifications } from "react-icons/io5";
import { useAuth } from "@clerk/nextjs";
import { useFollowUser } from "@/libs/react-query/mutations/useFolllower";

function SubscribeButton({ targetUserId }) {
  const { getToken } = useAuth();
  const { mutateAsync, isPending } = useFollowUser();

  const handleSubscribe = async () => {
    try {
      const token = await getToken();
      await mutateAsync({ targetUserId, token });
    } catch (error) {
      console.error("Failed to subscribe", error.message);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={isPending}
      className={`flex items-center gap-1 bg-secondary/25 text-black px-4 py-2 rounded-full text-sm transition-transform transform hover:scale-105 active:scale-95 ${
        isPending && "opacity-50 cursor-not-allowed"
      }`}
    >
      <IoNotifications />
      <span>{isPending ? "Subscribing..." : "Subscribe"}</span>
    </button>
  );
}

export default SubscribeButton;
