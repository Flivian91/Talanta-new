"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import SubscribeButton from "../buttons/SubscribeButton";
import { useSingleUser } from "@/hooks/useSingleUser";
import { useAuth } from "@clerk/nextjs";

function VideoProfileView({ data }) {
  const [token, setToken] = useState(null);
  const { getToken } = useAuth();
  useEffect(() => {
    async function loadToken() {
      const t = await getToken();
      setToken(t);
    }
    loadToken();
  }, [getToken]);
  const {
    data: user,
    isLoading,
    error: userError,
  } = useSingleUser(token, data?.userInfo.userID);
  
  return (
    <div className="flex flex-row gap-1 items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <div className="flex flex-row gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex flex-col gap-1 ">
              <div className="w-32 h-6 animate-pulse bg-gray-200 rounded"></div>
              <div className="w-32 h-6 animate-pulse bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <div className="">
              <Image
                src={user?.data?.imageUrl}
                alt="User Profile Image"
                height={100}
                width={100}
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <h2 className="font-semibold tracking-wider text-base">
                {user?.data?.firstName || user?.data?.lastName}
              </h2>
              <span className="text-xs">20 Subscribers</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-1">
        <SubscribeButton targetUserId={user?.data?.id} />
      </div>
    </div>
  );
}

export default VideoProfileView;
