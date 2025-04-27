import Follow from "@/models/following";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { userId: userID } = await auth();
    
    if (!userID)
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );

    const { followingID } = await req.json();

    if (!followingID)
      return NextResponse.json(
        { status: "failed", error: "Missing User ID to be follow" },
        { status: 400 }
      );
    if (followingID === userID)
      return NextResponse.json(
        { status: "failed", error: "You cannot follow yourself" },
        { status: 400 }
      );
      
      

    // Check if already following
    const existingFollow = await Follow.findOne({
      followerID: userID,
      followingID,
    });
    console.log("I am here");
    

    if (existingFollow) {
      // Unfollow (Remove follow)
      await Follow.findByIdAndDelete(existingFollow._id);

      // Decrement counts
      // await User.findByIdAndUpdate(userID, { $inc: { followingCount: -1 } });
      // await User.findByIdAndUpdate(followingID, {
      //   $inc: { followersCount: -1 },
      // });

      return NextResponse.json(
        { status: "success", message: "Unfollowed successfully!" },
        { status: 200 }
      );
    }

    // Follow (Add new follow)
    const newFollow = await Follow.insertOne({
      followerID: userID,
      followingID,
    });

    // Increment counts
    // await User.findByIdAndUpdate(userID, { $inc: { followingCount: 1 } });
    // await User.findByIdAndUpdate(followingID, { $inc: { followersCount: 1 } });

    return NextResponse.json(
      {
        status: "success",
        message: "Followed successfully!",
        follow: newFollow,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Error following/unfollowing", error },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    if (!userID || !Types.ObjectId.isValid(userID))
      return NextResponse.json(
        { error: "Invalid or Missing User ID" },
        { status: 400 }
      );

    const followers = await Follow.find({ followingID: userID }).populate(
      "followerID",
      "firstName email"
    );

    return NextResponse.json({ followers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching followers", details: error },
      { status: 500 }
    );
  }
}
