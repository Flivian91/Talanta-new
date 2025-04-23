import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Count Users Registered per Month
export async function GET(req) {
  try {
    await connectDB();
    const talentsCreatedPerMonth = await Talent.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return NextResponse.json(
      { status: "success", data: talentsCreatedPerMonth },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}