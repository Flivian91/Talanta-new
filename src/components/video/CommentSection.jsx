"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import CommentCard from "../cards/CommentCard";
import CommentPagination from "./CommentPagination";
import CommentFilter from "../models/CommentFilter";
import CommentInput from "./CommentInput";
import { useCreateComment } from "@/libs/react-query/mutations/useCreateComment";
import { useAuth, useUser } from "@clerk/nextjs";
import { useComments } from "@/hooks/useComments";
import { useSingleUser } from "@/hooks/useSingleUser";

function CommentSection({ data }) {
  const { getToken } = useAuth();
  const { user:userData, isSignedIn } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState();
  const [token, setToken] = useState(null);
  const [text, setText] = useState("");
  const { mutateAsync: createComment, isPending } = useCreateComment();
  // function to fetch token
  useEffect(() => {
    const loadToken = async () => {
      const t = await getToken();
      setToken(t);
    };
    loadToken();
  }, []);
  // Fetch single user data
  const {
    data: user,
    isLoading,
    userError,
  } = useSingleUser(token, data?.userInfo.userID);

  // Handle create comments
  async function handleCreateComment(e) {
    e.preventDefault();
    const token = await getToken();
    const newUser = {
      fullName:
        `${user?.data?.firstName + " " + user?.data?.lastName}` ||
        user?.data?.emailAddresses.at(0).emailAddress.split("@").at(0),
      profileUrl: user?.data?.imageUrl,
      userID: user?.data?.id,
    };
    await createComment({ talentID: data?._id, token, text, user: newUser });
    setText("");
  }
  // Fetch comments
  const {
    data: comments,
    isLoading: loadingComments,
    isError: commentsError,
  } = useComments({ limit, page, talentID: data?._id });

  if (commentsError) {
    console.error("Error Loading Comments", commentsError);
  }
  if (userError) {
    console.error("Failed to fetch user data", userError);
  }
  console.log(userData?.publicMetadata);
  

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
          {loadingComments ? (
            <div className="flex items-center justify-center py-10">
              <p className="w-12 h-12 rounded-full border-t-2 border-b-2 border-secondary animate-spin"></p>
            </div>
          ) : (
            comments?.data.map((com) => (
              <CommentCard key={com._id} comment={com} />
            ))
          )}
        </div>
      </div>
      <CommentPagination />
    </div>
  );
}

export default CommentSection;
