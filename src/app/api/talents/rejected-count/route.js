import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Count the number of users
export async function GET(req) {
  try {
    await connectDB();
    const rejectedTalentsCount = await Talent.countDocuments({ approved: false });
    return NextResponse.json(
      { status: "success", data: rejectedTalentsCount },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
