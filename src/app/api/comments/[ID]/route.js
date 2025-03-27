import Comment from "@/models/comment";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// Get all comments for a talent
// GET /api/comments/[ID]
export async function GET(req, segmentData) {
  // Get talent By Talent ID
  try {
    await connectDB();
    const { ID: talentID } = await segmentData.params;
    if (!talentID || !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { error: "Invalid or Missing Talent ID" },
        { status: 400 }
      );
    }
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json({ error: "Talent not found" }, { status: 404 });
    }
    const comments = await Comment.find({ talentID: talentID }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { count: comments.length, status: "success", data: comments },
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
// ADMIN: Delete a comment
// DELETE /api/comments/[ID]
export async function DELETE(req, segmentData) {
  try {
    await connectDB();
    const { ID: commentID } = await segmentData.params;
    if (!commentID || !Types.ObjectId.isValid(commentID)) {
      return NextResponse.json(
        { error: "Invalid or Missing Comment ID" },
        { status: 400 }
      );
    }
    // Check if is ADMIN
    const role = "admin";
    if (role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized, Admin Only" },
        { status: 401 }
      );
    }
    const comment = await Comment.findByIdAndDelete(commentID);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return NextResponse.json(
      { status: "success", data: comment },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting comment", error);
    return NextResponse.json(
      { error: "Error deleting comment", details: error },
      { status: 500 }
    );
  }
}
