// Count Users From the clerk
import { handleApiError } from "@/middleware/errorHandler";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const counts = await (await clerkClient()).users.getCount();
    return NextResponse.json(
      { message: "Success", data: counts },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
