import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Get Total Number of Comments and Likes per Talent
export async function GET(req) {
  try {
    await connectDB();
    const engagementStats = await Talent.aggregate([
      { 
        $project: { 
          title: 1, 
          totalEngagement: { $add: ["$likesCount", "$commentsCount"] } 
        }
      },
      { $sort: { totalEngagement: -1 } }
    ]);
    return NextResponse.json(
      { status: "success", data: engagementStats },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}