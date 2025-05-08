"use client";
import { useLikeTalent } from "@/libs/react-query/mutations/useLikeTalent";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
function LikeButton({ data }) {
  const { getToken, userId } = useAuth();
  const { mutateAsync: likeTalent, isPending } = useLikeTalent();

  // Load token
  async function handleLikeTalent() {
    const token = await getToken();
    await likeTalent({
      talentID: data?._id,
      token,
      userID: userId,
    });
  }
  return (
    <button
      disabled={isPending}
      onClick={() => handleLikeTalent()}
      className="flex disabled:bg-gray-200 disabled:cursor-not-allowed items-center sm:gap-2 bg-gray-100 gap-1 px-2 sm:px-4 py-1 sm:py-2rounded  transition-transform duration-300 transform hover:scale-105 active:scale-95 text-sm tracking-wide font-medium"
    >
      {isPending && (
        <p className="w-2 h-2 rounded-full border-t border-b border-white animate-spin"></p>
      )}
      <AiOutlineLike />
      <span>{data.likesCount > 0 ? data.likesCount : ""}</span>
    </button>
  );
}

export default LikeButton;
