import { handleApiError } from "@/middleware/errorHandler";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Count Users Registered per Month
export async function GET(req) {
  try {
    await connectDB();
    const usersRegisteredPerMonth = await User.aggregate([
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
      { status: "success", data: usersRegisteredPerMonth },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}