"use client";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function UploadVideoModel() {
  const [videoInfo, setVideoInfo] = useState(null);
  const { push } = useRouter();
  useEffect(
    function () {
      if (videoInfo !== null) {
        push(
          `/you/upload/final?public_id=${videoInfo?.public_id}`
        );
      }
    },
    [videoInfo]
  );
  console.log(videoInfo);
  

  return (
    <div className="fixed top-1/2 left-1/2 w-3/4 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg bg-white p-4 z-50 border">
      <div className="flex items-center flex-col py-4 gap-4 mt-5">
        <CldUploadWidget
          // signatureEndpoint="/api/sign-cloudinary-params"
          uploadPreset="Images"
          onSuccess={(result, { widget }) => {
            setVideoInfo(result?.info);
            toast.success("Talent Uploaded Successfully!");
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <button
                className="bg-gray-200/45 p-12 rounded-full flex items-center justify-center"
                onClick={() => open()}
              >
                <FaFileUpload fontSize={32} />
              </button>
            );
          }}
        </CldUploadWidget>
        <h2 className="text-sm font-medium tracking-wide text-gray-500 text-center">
          Your Vides will be private untill Admin Approves them.
        </h2>
        {videoInfo !== null ? (
          <button onClick={() => push(`you/upload/final`)}>Next</button>
        ) : (
          <CldUploadWidget
            // signatureEndpoint="/api/sign-cloudinary-params"
            uploadPreset="Images"
            onSuccess={(result, { widget }) => {
              setVideoInfo(result?.info);
              toast.success("Talent Uploaded Successfully!");
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="bg-secondary rounded text-white  px-4 py-2 tracking-wide font-semibold"
                  onClick={() => open()}
                >
                  Upload Talents
                </button>
              );
            }}
          </CldUploadWidget>
        )}
        <div className="flex items-center justify-center w-full sm:px-6 md:px-16 px-2 lg:px-24 mt-5">
          <p className="text-center md:text-base text-xs tracking-wide text-gray-400">
            By submitting your videos to Talanta, you acknowledge that you agree
            to Talanta's{" "}
            <Link href={"/"} className="text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"/"} className="text-blue-500">
              Community Guidelines
            </Link>{" "}
            . Please make sure that you do not violate others' copyright or
            privacy rights.{" "}
            <Link href={"/"} className="text-blue-500">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UploadVideoModel;
