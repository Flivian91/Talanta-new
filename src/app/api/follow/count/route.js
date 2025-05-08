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
    // if (!followerID) {
    //   return NextResponse.json(
    //     {
    //       status: "failed",
    //       message: "Missing Follower ID",
    //     },
    //     { status: 400 }
    //   );
    // }
    if (!followingID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Missing Following ID",
        },
        { status: 400 }
      );
    }
    await connectDB();

    const followerCount = await Follow.countDocuments({followingID});
    return NextResponse.json(
      {
        status: "success",
        data: followerCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
