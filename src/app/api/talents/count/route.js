import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Count the number of users
export async function GET(req) {
  try {
    // Ensure User ID Exisits
    // const { userId, sessionClaims } = await auth();
    // if (!userId) {
    //   return NextResponse.json(
    //     { status: "error", message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
    // const role = await sessionClaims?.metadata?.role;
    // if (role !== "admin") {
    //   return NextResponse.json(
    //     { status: "error", message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
    await connectDB();
    const talentsCount = await Talent.countDocuments();
    return NextResponse.json(
      { status: "success", data: talentsCount },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
