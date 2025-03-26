import Comment from "@/models/comment";
import connectDB from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// GET all and POST Comments
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const talentID = searchParams.get("talentID");
    const userID = searchParams.get("userID");
    const clerkID = searchParams.get("clerkID");
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
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing User ID",
        },
        { status: 400 }
      );
    }
    if (!clerkID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing Clerk ID",
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
    const userID = searchParams.get("userID");
    const talentID = searchParams.get("talentID");
    const clerkID = searchParams.get("clerkID");
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing User ID",
        },
        { status: 400 }
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
    if (!clerkID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or Missing Clerk ID",
        },
        { status: 400 }
      );
    }
    const { text, likesCount } = await req.json();
    const comment = await Comment.insertOne({
      userID,
      talentID,
      text,
      likesCount,
    });
    return NextResponse.json({
      status: "success",
      message: "Comment Created Successfully",
      data: comment,
    });
  } catch (error) {
    console.log("Error Creating Comment", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Creating Comment",
      },
      { status: 500 }
    );
  }
}
