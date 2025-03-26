import Comment from "@/models/comment";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, segmentData) {
  // Get talent By Talent ID
  try {
    await connectDB();
    const { talentID } = await segmentData.params;
    if (!talentID || !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { error: "Invalid or Missing Talent ID" },
        { status: 400 }
      );
    }
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { error: "Talent not found" },
        { status: 404 }
      );
    }
    const comments = await Comment.find({talentID:talentID}).sort({ createdAt: -1 });

    return NextResponse.json(
      { status: "success", data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching comments", error);
    return NextResponse.json(
      { error: "Error fetching comments", details: error },
      { status: 500 }
    );
  }
}
