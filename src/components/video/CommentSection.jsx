"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GoFilter } from "react-icons/go";
import CommentCard from "../cards/CommentCard";
import CommentPagination from "./CommentPagination";
import CommentFilter from "../models/CommentFilter";
import CommentInput from "./CommentInput";
import { useCreateComment } from "@/libs/react-query/mutations/useCreateComment";
import { useAuth } from "@clerk/nextjs";

function CommentSection({ data }) {
  const { getToken } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { mutateAsync: createComment, isPending } = useCreateComment();
  async function handleCreateComment(e) {
    e.preventDefault();
    const token = await getToken();
    await createComment({ talentID: data?._id, token, text });
  }
  return (
    <div className="rounded shadow border border-gray-200 py-2 ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 border-b py-2 px-2">
          <div className="relative flex items-center justify-between ">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className=" font-mono tracking-wide font-semibold ">
                {data.commentsCount}
              </span>
              <h1 className="tracking-wide font-semibold ">Comments</h1>
            </div>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="p-1 hover:bg-gray-200 rounded-sm transition-all duration-300 hover:text-black "
            >
              <GoFilter />
            </button>
            {isOpen && <CommentFilter />}
          </div>
          <CommentInput
            onCreateComment={handleCreateComment}
            text={text}
            setText={setText}
            isPending={isPending}
          />
        </div>

        {/* Comment Card */}
        <div className="flex flex-col md:gap-2 gap-4 px-2 py-3">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
      <CommentPagination />
    </div>
  );
}

export default CommentSection;
