import React from "react";
import { IoClose } from "react-icons/io5";

function FinalVideoUploadModel({ createTalent, onClose, loading }) {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 bg-white transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 mx-2 w-full  shadow-md rounded-md">
      <div className="py-2 px-3 flex items-center justify-end border-b">
        <button
          onClick={onClose}
          className="text-xl p-2 rounded hover:bg-gray-100"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="mt-8 px-4 pb-6 flex items-center  flex-col gap-4 w-full">
          <p className="text-xl md:text-2xl text-center font-semibold text-gray-800">
            Admin can only see the videos you upload. They will remain private
            until Admin approves them.
          </p>
          <p className="text-xs sm:text-sm text-gray-600  text-center">
            Please ensure that your video complies with our community guidelines
            and terms of service. Any inappropriate content will be rejected.
          </p>
          <button
            onClick={() => createTalent()}
            className="bg-secondary text-white py-2 px-4 mt-5 rounded hover:bg-secondary/80 tracking-wider font-semibold transition-all duration-300"
          >
            {loading ? "Uploading Talent..." : "Upload Talent"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalVideoUploadModel;
