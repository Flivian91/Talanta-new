import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { talentUpdateSchema } from "@/validator/talents/talentSchema";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// GET single Talent, UPDATE and DELETE
export async function GET(req, segmentData) {
  try {
    //TODO; Get User from the current session
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    const { talentID } = await segmentData.params;
    if (!talentID && !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing Talent ID" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "No Talent Found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: "success", data: talent },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching Talent", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to fetch Talent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
// Update talent
export async function PATCH(req, segmentData) {
  try {
    // Get Currently logged in User
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    // Get talent ID from URL
    const { talentID } = await segmentData.params;
    if (!talentID && !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing Talent ID" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "No Talent Found" },
        { status: 400 }
      );
    }
    const role = await sessionClaims?.metadata?.role;

    // TODO: Ensure only admin and owner of the Talent can Delete
    if (talent.clerkID.toString() !== userId && role !== "admin") {
      console.log("I am here");

      return NextResponse.json(
        { status: "failed", message: "Permission denied" },
        { status: 403 }
      );
    }
    const body = await req.json();

    const validatedData = talentUpdateSchema.parse(body);

    const updatedTalent = await Talent.findByIdAndUpdate(
      talentID,
      validatedData,
      { new: true }
    );
    return NextResponse.json(
      {
        status: "success",
        message: "Talent Updated Successfully",
        data: updatedTalent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Updating Talent", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to Update Talent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
// Delete talent
export async function DELETE(req, segmentData) {
  try {
    // TODO: Get Currently login from clerk
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    const { talentID } = await segmentData.params;
    if (!talentID && !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing Talent ID" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "No Talent Found" },
        { status: 400 }
      );
    }
    const role = await sessionClaims?.metadata?.role;

    // TODO: Ensure only admin and owner of the Talent can Delete
    if (talent.clerkID.toString() !== userId && role !== "admin") {
      return NextResponse.json(
        { status: "failed", message: "Permission denied" },
        { status: 403 }
      );
    }

    const deletedTalent = await Talent.findByIdAndDelete(talentID);
    return NextResponse.json(
      {
        status: "success",
        message: "Talent Deleted Successfully",
        data: deletedTalent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Deleting Talent", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to Delete Talent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
