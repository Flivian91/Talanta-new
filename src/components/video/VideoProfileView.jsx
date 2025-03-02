import Image from "next/image";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import SubscribeButton from "../buttons/SubscribeButton";

function VideoProfileView() {
  return (
    <div className="flex flex-row gap-1 items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full">
            <Image
              src={"/profile.webp"}
              height={100}
              width={100}
              alt={"This is an altenative text"}
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <h2 className="font-semibold tracking-wider text-base">Flivian</h2>
            <span className="text-xs">20 Subscribers</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <SubscribeButton />
      </div>
    </div>
  );
}

export default VideoProfileView;
