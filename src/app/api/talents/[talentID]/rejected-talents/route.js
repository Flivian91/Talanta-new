import { handleApiError } from "@/middleware/errorHandler";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// Admin approve talents
export async function PATCH(req, segmentData) {
  try {
    // Get talent ID from URL
    const { talentID } = await segmentData.params;

    if (!talentID) {
      return NextResponse.json(
        { status: "failed", message: "No talentID found" },
        { status: 400 }
      );
    }
    // Check Talent ID format
    if (!Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid Talent ID format" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    // Check if the talent Exisits
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "Talent Not Found" },
        { status: 400 }
      );
    }
    // Update the Talent
    const rejectedTalent = await Talent.findByIdAndUpdate(talent._id, {
      approved: false,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Talent approved Successfully",
        data: rejectedTalent,
      },
      { status: 201 }
    );
    // Connect to database
  } catch (error) {
    return handleApiError(error);
  }
}
