import Share from "@/models/share";
import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    // const { userId } = auth();
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing User ID" },
        { status: 400 }
      );
    }

    const { talentID, caption } = await req.json();
    if (!talentID)
      return NextResponse.json(
        { status: "failed", message: "Talent ID is required" },
        { status: 400 }
      );

    // Check if talent exists
    const talent = await Talent.findById(talentID);
    if (!talent)
      return NextResponse.json(
        { status: "failed", message: "Talent not found" },
        { status: 404 }
      );

    // Check if already shared
    const existingShare = await Share.findOne({ userID, talentID });
    if (existingShare) {
      return NextResponse.json(
        { error: "You have already shared this talent" },
        { status: 400 }
      );
    }

    // Create new share
    const newShare = await Share.insertOne({ userID, talentID, caption });
    // Increment share count
    await Talent.findByIdAndUpdate(talentID, { $inc: { shareCount: 1 } });

    return NextResponse.json(
      {
        status: "success",
        message: "Talent shared successfully!",
        share: newShare,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Error sharing talent", error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    if (!userID)
      return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const shares = await Share.find({ userID }).populate("talentID");

    return NextResponse.json({ shares }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching shared talents", details: error },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    await connectDB();
    // const { userId } = auth();
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing User ID" },
        { status: 400 }
      );
    }

    const { shareID } = await req.json();
    if (!shareID)
      return NextResponse.json({ error: "Share ID required" }, { status: 400 });

    // Find and delete the share
    const share = await Share.findOneAndDelete({
      _id: shareID,
      userID: userID,
    });
    if (!share)
      return NextResponse.json({ error: "Share not found" }, { status: 404 });

    // Decrement share count
    await Talent.findByIdAndUpdate(share.talentID, {
      $inc: { shareCount: -1 },
    });

    return NextResponse.json(
      { message: "Talent unshared successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error unsharing talent", details: error },
      { status: 500 }
    );
  }
}
