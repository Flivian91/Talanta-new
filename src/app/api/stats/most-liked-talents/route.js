import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Get Most Liked talents
export async function GET(req) {
  try {
    await connectDB();
    const topLikedTalents = await Talent.aggregate([
      {
        $sort: { likesCount: -1 },
      },
      {
        $limit: 10,
      },
      // {
      //   $project: {
      //     _id: 1,
      //     title: 1,
      //     userInfo: 1,
      //     likesCount: 1,
      //   },
      // },
    ]);
    return NextResponse.json(
      { status: "success", data: topLikedTalents },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
