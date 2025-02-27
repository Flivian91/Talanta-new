import Image from "next/image";
import Link from "next/link";
import React from "react";

function CommentCard() {
  return (
    <div className="px-2 py-2 shadow rounded flex flex-col gap-2 hover:bg-gray-50">
      <div className="flex items-center justify-between gap-2 sm:text-sm text-xs tracking-wide text-gray-600">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/profile.webp"}
            width={100}
            height={100}
            alt="Profile image"
            className="w-6 h-6 rounded-full"
          />
          <span>Flivian</span>
        </Link>
        <div className="flex items-center gap-2">
          <p className="w-2 h-2 rounded-full bg-secondary animate-pulse"></p>
          <span>1 Month</span>
        </div>
      </div>
      <div className="mt-2">
        <p className=" text-gray-600 tracking-wide font-medium sm:text-sm text-xs">
          This is the actual Comment lorem
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
