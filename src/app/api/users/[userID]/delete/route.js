import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { handleApiError } from "@/middleware/errorHandler";

export async function DELETE(req) {
  console.log(getAuth(req));

  try {
    // const { userId: adminID } = getAuth(req);
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    // ✅ Ensure the request comes from an admin
    // const adminUser = await (await clerkClient()).users.getUser(adminID);
    // if (adminUser.publicMetadata.role !== "admin") {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    // }
    // ✅ Ensure user exists
    const existingUser = await (await clerkClient()).users.getUser(userID);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await (await clerkClient()).users.deleteUser(userID);

    return NextResponse.json(
      { message: `User ${userID} has been deleted`, data },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
