import { handleApiError } from "@/middleware/errorHandler";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Get Most followed users
export async function GET(req) {
  try {
    await connectDB();
    const mostFollowedUsers = await User.aggregate([
      {
        $sort: { followersCount: -1 },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          email: 1,
          followersCount: 1,
        },
      },
    ]);
    return NextResponse.json(
      { status: "success", data: mostFollowedUsers },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}