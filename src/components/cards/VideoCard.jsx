// src/Components/VideoCard.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="block">
      <div
        className="bg-white rounded shadow overflow-hidden transform transition duration-300 hover:scale-105"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video Thumbnail */}
        <Link href={`/watch/${video._id}`} className="relative">
          <img
            src={hovered ? video.thumbnail : video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          {/* Hover effect (Play Icon) */}
          {hovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white border border-white rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6l5-3-5-3z"
                />
              </svg>
            </div>
          )}
        </Link>

        {/* Video Details */}
        <div className="p-3 flex flex-col gap-2">
          <Link
            href={`/watch/${video._id}`}
            className="text-lg font-semibold text-gray-900"
          >
            {video.title}
          </Link>
          <div className="flex items-center gap-2 w-full">
            <Link href={"/"}>
              <Image
                src={"/profile.webp"}
                width={100}
                height={100}
                alt="Profile image"
                className="h-8 w-8 rounded-full"
              />
            </Link>
            <div className="flex items-center justify-between gap-2">
              <Link href={`/${video.channel}`} className="text-[10px] font-medium tracking-wide">
                {video.channel}
              </Link>
              <p className="text-xs text-gray-500">
                {video.views} • {video.published}
              </p>
            </div>
          </div>
          {/* <p className="text-sm text-gray-600">{video.channel}</p>
          <p className="text-xs text-gray-500">{video.views} • {video.published}</p> */}
        </div>
      </div>
    </section>
  );
}
