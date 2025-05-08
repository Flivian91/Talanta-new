import { handleApiError } from "@/middleware/errorHandler";
import Follow from "@/models/following";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const followingID = searchParams.get("followingID");
    const followerID = searchParams.get("followerID");
    if (!followerID || !Types.ObjectId.isValid(followerID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid Follower ID",
        },
        { status: 400 }
      );
    }
    if (!followingID || !Types.ObjectId.isValid(followingID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid Following ID",
        },
        { status: 400 }
      );
    }
    await connectDB();
    const follower = await User.findById(followerID);
    const following = await User.findById(followingID);
    if (!follower) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Follower Not Found",
        },
        { status: 404 }
      );
    }
    if (!following) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Following Not Found",
        },
        { status: 404 }
      );
    }
    const followerCount = await Follow.countDocuments({ followerID });
    return NextResponse.json(
      {
        status: "success",
        data: followerCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error)
  }
}