"use client";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import React from "react";
import { FaFileUpload } from "react-icons/fa";

function UploadVideoInto() {
  return (
    <div>
      <div className="flex items-center flex-col py-4 gap-4 mt-5">
        <CldUploadButton uploadPreset="Images" className="">
          <span className="bg-gray-200/45 p-12 rounded-full flex items-center justify-center">
            <FaFileUpload fontSize={32} />
          </span>
        </CldUploadButton>
        <h2 className="text-sm font-medium tracking-wide text-gray-500 text-center">
          Your Vides will be private untill Admin Approves them.
        </h2>
        <CldUploadButton options={['local']} uploadPreset="Images" className="mt-4">
          <span className="bg-secondary rounded text-white  px-4 py-2 tracking-wide font-semibold">
            Upload Talents
          </span>
        </CldUploadButton>
        <div className="flex items-center justify-center w-full sm:px-6 md:px-16 px-2 lg:px-24 mt-5">
          <p className="text-center md:text-base text-xs tracking-wide text-gray-400">
            By submitting your videos to Talanta, you acknowledge that you agree
            to Talanta's <Link href={"/"} className="text-blue-500">Terms of Service</Link> and{" "}
            <Link href={"/"} className="text-blue-500">Community Guidelines</Link> . Please make sure that
            you do not violate others' copyright or privacy rights.{" "}
            <Link href={"/"} className="text-blue-500">
            Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UploadVideoInto;
