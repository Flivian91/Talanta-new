"use client";
import { copyToClipboard } from "@/helpers/copyToClipboard";
import dayjs from "dayjs";
import React from "react";
import { IoCopyOutline } from "react-icons/io5";

function AdminUserMinorDetails({ user }) {
  const formatedDate = dayjs(user?.createdAt).format("DD MMMM, YYYY");
  return (
    <div className="flex flex-col gap-3 px-2 py-4">
      <div className="flex flex-col gap-2 border-b pb-2">
        <h2 className="text-sm font-semibold tracking-wide text-gray-500">
          User ID
        </h2>
        <div className="flex items-center gap-2 text-xs tracking-wider font-semibold text-gray-500">
          <h3 className="flex-1 w-full truncate">{user?.id}</h3>
          <button
            onClick={() =>
              copyToClipboard("user_2vPhhadVCXlrAGRassadsdsBXf9DvzsLbVc")
            }
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b pb-2">
        <h2 className="text-sm font-semibold tracking-wide text-gray-500">
          External ID
        </h2>
        <div className="flex items-center gap-2 text-xs tracking-wider font-semibold text-gray-500">
          <h3 className="flex-1 w-full truncate">{user?.externalId}</h3>
          <button
            onClick={() =>
              copyToClipboard("user_2vPhhadVCXlrAGRassadsdsBXf9DvzsLbVc")
            }
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b pb-2">
        <h2 className="text-sm font-semibold tracking-wide text-gray-500">
          Primary Email
        </h2>
        <div className="flex items-center gap-2 text-xs tracking-wider font-semibold text-gray-500">
          <h3 className="flex-1 w-full truncate">
            {user?.emailAddresses.at(0).emailAddress}
          </h3>
          <button
            onClick={() =>
              copyToClipboard("user_2vPhhadVCXlrAGRassadsdsBXf9DvzsLbVc")
            }
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b pb-2">
        <h2 className="text-sm font-semibold tracking-wide text-gray-500">
          User Since
        </h2>
        <div className="flex items-center gap-2 text-xs tracking-wider font-semibold text-gray-500">
          <h3 className="flex-1 w-full truncate">{formatedDate}</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminUserMinorDetails;
