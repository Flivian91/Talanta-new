import { handleApiError } from "@/middleware/errorHandler";
import Comment from "@/models/comment";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// GET all and POST Comments
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const talentID = searchParams.get("talentID");
    const userID = searchParams.get("userID");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const skip = ((page || 1) - 1) * (limit || 10);
    if (!talentID || !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing Talent ID",
        },
        { status: 400 }
      );
    }
    if (!userID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing user ID",
        },
        { status: 400 }
      );
    }
    // Fetch all comments for a talent
    const comments = await Comment.find({ talentID })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return NextResponse.json({
      count: comments.length,
      status: "success",
      data: comments,
    });
  } catch (error) {
    console.log("Error Fetching Comments", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Fetching Comments",
      },
      { status: 500 }
    );
  }
}
// Create a new comment (body{userID, talentID, text, likesCount})
export async function POST(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const {userId:userID} = await auth()
    const talentID = searchParams.get("talentID");
    if (!userID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "unauthorized Access",
        },
        { status: 401 }
      );
    }
    if (!talentID || !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing Talent ID",
        },
        { status: 400 }
      );
    }

    // Create a new comment
    const { text } = await req.json();
    console.log(text);
    const comment = await Comment.insertOne({
      userID,
      talentID,
      text
    });
    // Update the comments count in the talent
    await Talent.findByIdAndUpdate(talentID, {
      $inc: { commentsCount: 1 },
    });
    return NextResponse.json({
      status: "success",
      message: "Comment Created Successfully",
      data: comment,
    });
  } catch (error) {
    return handleApiError(error)
  }
}
