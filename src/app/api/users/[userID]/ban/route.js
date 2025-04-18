import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { handleApiError } from "@/middleware/errorHandler";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const { userId } = await auth();
    //✅ Check if the user is login
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    // ✅ Ensure user exists
    const existingUser = await (await clerkClient()).users.getUser(userID);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await (await clerkClient()).users.banUser(userID);

    return NextResponse.json(
      { message: `User ${userID} has been banned` },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
