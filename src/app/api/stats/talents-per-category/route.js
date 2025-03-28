import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Total number of talents per category
export async function GET(req) {
  try {
    await connectDB();
    const talentsByCategory = await Talent.aggregate([
      {
        $unwind: "$categories",
      },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    return NextResponse.json(
      { status: "success", data: talentsByCategory },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
