import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    return NextResponse.json({
      status: "success",
      message: "Database working Correctly",
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      message: "Error Fetching the Use",
    });
  }
}
