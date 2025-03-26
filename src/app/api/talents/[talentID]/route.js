import Talent from "@/models/talent";
import connectDB from "@/utils/db";
import { talentUpdateSchema } from "@/validator/talents/talentSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// GET single Talent, UPDATE and DELETE
export async function GET(req, segmentData) {
  try {
    // Get searchParams
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const { talentID } = await segmentData.params;
    if (!userID && !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing User ID" },
        { status: 400 }
      );
    }
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
    // Get searchParams
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const clerkID = searchParams.get("clerkID");
    const { talentID } = await segmentData.params;
    if (!userID && !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing User ID" },
        { status: 400 }
      );
    }
    if (!talentID && !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing Talent ID" },
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
    // Connect to the database
    await connectDB();
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "No Talent Found" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const validatedData = talentUpdateSchema.parse(body);
    // Validate talent Title
    const existingTalent = await Talent.findOne({
      title: validatedData?.title,
    });

    if (existingTalent) {
      return NextResponse.json(
        {
          status: "failed",
          message: "A talent with this title already exists!",
        },
        { status: 400 }
      );
    }
    const role = "admin";
    // TODO: Ensure only admin and owner of the Talent can Delete
    if (talent.clerkID.toString() !== clerkID && role !== "admin") {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }
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
    // Get searchParams
    // TODO: Get Currently login from clerk
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const clerkID = searchParams.get("clerkID");
    const { talentID } = await segmentData.params;
    if (!userID && !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing User ID" },
        { status: 400 }
      );
    }
    if (!talentID && !Types.ObjectId.isValid(talentID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing Talent ID" },
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
    // Connect to the database
    await connectDB();
    const talent = await Talent.findById(talentID);
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "No Talent Found" },
        { status: 400 }
      );
    }
    const role = "admin";
    // TODO: Ensure only admin and owner of the Talent can Delete
    if (talent.clerkID.toString() !== clerkID && role !== "admin") {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
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
