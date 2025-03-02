"use client";
import React, { useState } from "react";

function VideoDescription() {
  const [isOpen, setIsOpen] = useState(false);
  const description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            eum sit, nihil dolorem quasi sequi quae exercitationem doloribus,
            ipsum aperiam assumenda maiores officiis dolores expedita nostrum
            laborum? Dolorum quis omnis vero voluptatem modi laborum, alias iure
            in labore doloremque, nesciunt eius maiores, unde ipsam recusandae
            voluptatibus deleniti animi eligendi? Molestias, porro voluptate.
            Minima voluptate, totam nisi maxime laboriosam maiores, at ullam
            reprehenderit provident ipsam omnis facilis, fugiat ducimus neque
            excepturi. Laboriosam, illum rem! Cupiditate dignissimos voluptatem
            deleniti error dolorem eaque aut eius quo? Quis modi, nobis
            accusantium culpa qui non expedita aperiam repudiandae rem sunt hic
            totam vel sed sequi!`;
  return (
    <div className="px-2 py-2 text-sm text-gray-600">
      <div className="w-full bg-gray-50 px-2 py-2 rounded flex flex-col gap-2">
        <div className="flex items-center  gap-4">
          <p className=" tracking-wide font-mono">1,000,000 views</p>
          <span className="tracking-wider">13/03/2025</span>
        </div>
        <div className="w-4/5">
          <p className="tracking-wide font-medium text-sm leading-relaxed">
            {isOpen === false ? description.slice(0, 200) : description}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-secondary cursor-pointer ml-2"
            >
              {isOpen === false ? "...Read more" : "Show less"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoDescription;
