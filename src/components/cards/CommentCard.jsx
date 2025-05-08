import Image from "next/image";
import Link from "next/link";
import React from "react";
import TimeAgo from "react-timeago";

function CommentCard({ comment }) {
  return (
    <div className="px-2 py-2 text-xs shadow rounded flex flex-col gap-2 hover:bg-gray-50">
      <div className="flex items-center justify-between gap-2 sm:text-sm text-xs tracking-wide text-gray-600">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={comment?.user.profileUrl}
            width={100}
            height={100}
            alt="Profile image"
            className="w-6 h-6 rounded-full"
          />
          <span>{comment?.user.fullName}</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono">
          <p className="w-2 h-2 rounded-full bg-secondary animate-pulse"></p>
          <TimeAgo date={comment.createdAt}  />
        </div>
      </div>
      <div className="mt-2">
        <p className=" text-gray-600 tracking-wide font-medium sm:text-sm text-xs">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
