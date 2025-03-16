// Role-based Authentication
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export function checkRole(allowedRoles) {
  return async function (req) {
    const { user } = await auth();
    const role = user?.publicMetadata?.role;

    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
  };
}
