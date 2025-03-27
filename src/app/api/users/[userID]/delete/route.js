import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { handleApiError } from "@/middleware/errorHandler";
import User from "@/models/user";

export async function DELETE(req) {
  try {
    const { userId: adminID } = getAuth(req);
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    // ✅ Ensure the request comes from an admin
    const adminUser = await (await clerkClient()).users.getUser(adminID);
    if (adminUser.publicMetadata.role !== "admin") {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized" },
        { status: 403 }
      );
    }
    // ✅ Ensure user exists
    const existingUser = await (await clerkClient()).users.getUser(userID);
    if (!existingUser) {
      return NextResponse.json(
        { status: "failed", message: "User not found" },
        { status: 404 }
      );
    }

    const deletedUser = await (await clerkClient()).users.deleteUser(userID);
    await User.findOneAndDelete({ clerkID: userID });

    return NextResponse.json(
      {
        status: "failed",
        message: `User ${userID} has been deleted`,
        deletedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
