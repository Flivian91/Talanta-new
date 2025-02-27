import React from "react";
function UploadVisibilityTerms() {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-8 p-4 md:4/5 lg:w-1/2 flex items-center  flex-col gap-4 w-full">
        <p className="text-xl md:text-2xl text-center font-semibold text-gray-800">
          Admin can only see the videos you upload. They will remain private
          until Admin approves them.
        </p>
        <p className="text-xs sm:text-sm text-gray-600  text-center">
          Please ensure that your video complies with our community guidelines
          and terms of service. Any inappropriate content will be rejected.
        </p>
        <button className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary/80 tracking-wider font-semibold transition-all duration-300">
          Complete Upload
        </button>
      </div>
    </div>
  );
}

export default UploadVisibilityTerms;
