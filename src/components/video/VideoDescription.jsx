"use client";
import { formatedDate } from "@/helpers/formatedDate";
import React, { useState } from "react";

function VideoDescription({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const description = `${data.description}`;
  return (
    <div className="px-2 py-2 text-sm text-gray-600">
      <div className="w-full bg-gray-50 px-2 py-2 rounded flex flex-col gap-2">
        <div className="flex items-center text-xs gap-4">
          <p className=" tracking-wide font-mono">1,000,000 views</p>
          <span className="tracking-wider">{formatedDate(data.createdAt)}</span>
        </div>
        <div className="md:w-4/5">
          <p className="tracking-wide font-medium text-sm leading-relaxed">
            {isOpen === false ? description.slice(0, 200) : description}
            {description.length >= 200 && (
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-secondary cursor-pointer ml-2"
              >
                {isOpen === false ? "...Read more" : "Show less"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoDescription;
