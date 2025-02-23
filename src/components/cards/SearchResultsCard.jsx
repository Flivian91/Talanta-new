import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

function SearchResultsCard({data}) {
  return (
    <Link
      href={"/watch/1"}
      className="flex items-center gap-3 px-2  md:px-6 py-4 hover:bg-gray-100"
    >
      {/* Image */}
      <Image
        src={"/logo.svg"}
        alt="Logo image"
        width={30}
        height={50}
        className="h-5 w-5"
      />
      {/* Heading */}
      <h2 className="flex-1 w-full tracking-wide text-xs md:text-base truncate font-medium text-gray-600">
        This is a Video that the user will be searching
      </h2>
      <span>
        <LiaExternalLinkAltSolid />
      </span>
    </Link>
  );
}

export default SearchResultsCard;
