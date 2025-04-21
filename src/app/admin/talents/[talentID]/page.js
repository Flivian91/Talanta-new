"use client";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import AdminTalentSkeleton from "@/components/dashboard/admin/Talents/AdminTalentSkeleton";
import { extractPublicIdFromUrl } from "@/helpers/extractPublicIDFromUrl";
import { useApproveTalent } from "@/hooks/useApproveTalent";
import { useDeleteTalent } from "@/hooks/useDeleteTalent";
import { useSingleTalent } from "@/hooks/useGetSingleTalent";
import { useRejectTalent } from "@/hooks/useRejectTalent";
import { useUpdateTalent } from "@/libs/react-query/mutations/useUpdateTalent";
import { useAuth } from "@clerk/nextjs";
import { CldVideoPlayer } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiCheck, FiTrash, FiX } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";

function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { back } = useRouter();
  const { talentID } = useParams();
  const [publicID, setPublicID] = useState(null);
  const { getToken } = useAuth();

  const { data: talent, error, isLoading } = useSingleTalent(talentID);
  // Handle Mutation of delete
  const { mutate: deleteTalent, isPending: deletingTalent } = useDeleteTalent();
  const { mutate: approveTalent, isPending: approvingTalent } =
    useApproveTalent();
  const { mutate: rejectTalent, isPending: rejectingTalent } =
    useRejectTalent();

  const { mutateAsync: updateTalent, isPending } = useUpdateTalent();
  if (error) {
    console.log("Error fetching Talent Data");
  }

  useEffect(
    function () {
      if (talent?.data) {
        const stat = talent?.data?.approved ? "approved" : "pending";
        setStatus(stat);
        setTitle(talent?.data?.title);
        setDescription(talent?.data?.description);
      }
    },
    [talent]
  );
  useEffect(() => {
    if (talent?.data?.videoUrl) {
      const id = extractPublicIdFromUrl(talent.data.videoUrl);
      setPublicID(id);
    }
  }, [talent]);
  // Handle Delete Talent
  async function handleDelete(id) {
    const token = await getToken();
    deleteTalent({ id, token });
    back();
  }
  async function handleApprove(id) {
    const token = await getToken();
    approveTalent({ id, token });
  }
  async function handleReject(id) {
    const token = await getToken();
    rejectTalent({ id, token });
  }

  const handleSave = async () => {
    const token = await getToken();
    try {
      await updateTalent({
        token,
        payload: {
          title,
          description,
          status,
        },
        talentID,
      });
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  // Handle Approve Talent
  if (isLoading) {
    return <AdminTalentSkeleton />;
  }

  return (
    <div>
      <div className="py-2">
        <button
          onClick={() => back()}
          className="flex items-center gap-2 px-3 py-1 bg-gray-200 shadow rounded text-black"
        >
          <IoIosArrowRoundBack />
          <span>back</span>
        </button>
      </div>
      <div className="bg-white w-full rounded-lg shadow-xl px-3 py-2 relative space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Manage Talent
          </h2>
          <div className="text-black ">
            {talent?.data?.approved ? (
              <span className="px-2 py-1 bg-green-100/60 rounded text-green-600">
                Approved
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100/60 rounded text-red-600">
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Video Preview */}
        <div className="rounded overflow-hidden w-full">
          {publicID ? (
            <CldVideoPlayer
              id={Date.now()}
              width="1920"
              height="580"
              src={publicID}
              pictureInPictureToggle
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded"></div>
          )}
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 text-sm border-t">
          <button
            disabled={deletingTalent}
            onClick={() => handleDelete(talentID)}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiTrash /> Delete
          </button>
          <div className="flex sm:flex-row flex-col gap-3">
            {talent?.data?.approved ? (
              <button
                disabled={rejectingTalent}
                onClick={() => handleReject(talentID)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiX /> Reject
              </button>
            ) : (
              <button
                disabled={approvingTalent}
                onClick={() => handleApprove(talentID)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiCheck /> Approve
              </button>
            )}
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleSave()}
                disabled={isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPending && (
                  <p className="w-4 h-4 rounded-full border-t border-b border-white animate-spin"></p>
                )}
                <span>{isPending ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
