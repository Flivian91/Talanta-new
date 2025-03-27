import Comment from "@/models/comment";
import Like from "@/models/like";
import Talent from "@/models/talent";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// Count likes for a target
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const targetID = searchParams.get("targetID");

    if (!targetID || !Types.ObjectId.isValid(targetID))
      return NextResponse.json(
        { error: "Invalid or Missing Target ID" },
        { status: 400 }
      );

    const likeCount = await Like.countDocuments({ targetID });

    return NextResponse.json(
      { status: "success", likes: likeCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching likes", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    // const { userId } = await auth()
    // if (!userId)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    if (!userID) {
      return NextResponse.json(
        { status: "failed", error: "Unauthorized" },
        { status: 401 }
      );
    }
    if (!Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", error: "Invalid User ID" },
        { status: 400 }
      );
    }
    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json(
        { status: "failed", error: "User not found" },
        { status: 404 }
      );
    }

    const { targetID, targetType } = await req.json();
    if (!Types.ObjectId.isValid(targetID)) {
      return NextResponse.json(
        { status: "failed", error: "Invalid Target ID" },
        { status: 400 }
      );
    }

    if (!["Talent", "Comment"].includes(targetType)) {
      return NextResponse.json(
        { status: "failed", error: "Invalid target type" },
        { status: 400 }
      );
    }
    // Toogle Mechanism
    // Check if user has already liked the target
    const existingLike = await Like.findOne({ userID, targetID });

    if (existingLike) {
      // Unlike (Remove like)
      await Like.findByIdAndDelete(existingLike._id);

      // Decrement likes count
      if (targetType === "Talent")
        await Talent.findByIdAndUpdate(targetID, { $inc: { likesCount: -1 } });
      if (targetType === "Comment")
        await Comment.findByIdAndUpdate(targetID, { $inc: { likesCount: -1 } });

      return NextResponse.json(
        { status: "success", message: "Like removed!" },
        { status: 200 }
      );
    }

    // Like (Add new like)
    const newLike = await Like.insertOne({ userID, targetID, targetType });

    // Increment likes count
    if (targetType === "Talent")
      await Talent.findByIdAndUpdate(targetID, { $inc: { likesCount: 1 } });
    if (targetType === "Comment")
      await Comment.findByIdAndUpdate(targetID, { $inc: { likesCount: 1 } });

    return NextResponse.json(
      { status: "success", message: "Liked!", like: newLike },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Error liking/unliking", error },
      { status: 500 }
    );
  }
}
