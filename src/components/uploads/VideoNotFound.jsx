import Image from "next/image";
import Link from "next/link";
import React from "react";

function VideoNotFound() {
  return (
    <div className="flex  py-8 bg-secondary min-h-screen items-center w-full justify-center">
      <div className="flex items-center flex-col gap-4">
        <Image
          src={"/not-found.webp"}
          alt="Not found image"
          width={500}
          height={500}
        />
        <h1 className="text-xl md:text-2xl font-bold tracking-wide mt-4">
          Video Not Found
        </h1>
        <Link
          href={"/you/upload"}
          className="px-4 py-2 bg-accent text-white rounded tracking-wide font-semibold"
        >
          Click Here to Upload
        </Link>
      </div>
    </div>
  );
}

export default VideoNotFound;
