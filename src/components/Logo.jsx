import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-red-600 font-bold"
    >
      <Image
        src={"/talanta.svg"}
        alt="Talanta logo"
        width={100}
        height={100}
        className="md:-mt-2 -ml-6 sm:-ml-4 transform scale-75 md:scale-100"
      />
    </Link>
  );
}

export default Logo;
