import { NextResponse } from "next/server";

// GET single Talent, UPDATE and DELETE
export async function GET(req, segmentData) {
  try {
    
  } catch (error) {
    console.log("Error Fetching Talent", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to fetch Talent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
