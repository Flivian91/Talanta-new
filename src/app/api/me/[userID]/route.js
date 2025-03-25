// GET, PATCH and DELETE

import User from "@/models/user";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, segmentData) {
  try {
    const { userID } = await segmentData.params;
    if (!userID) {
      return NextResponse.json(
        { status: "failed", message: "Missing User ID" },
        { status: 400 }
      );
    }
    // Cleck ID
    const { searchParams } = new URL(req.url);
    const cleckID = searchParams.get("cleckID");
    if (!cleckID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Cleck ID is Missing",
        },
        { status: 400 }
      );
    }
    // Connect to database
    await connectDB();
    const user = await User.findOne({ _id: userID, cleckID: cleckID });
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "No User Found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching User Data", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Fetching User data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PATCH
export async function PATCH(req, segmentData) {
  try {
    const { userID } = await segmentData.params;
    if (!userID) {
      return NextResponse.json(
        { status: "failed", message: "Missing User ID" },
        { status: 400 }
      );
    }
    // Cleck ID
    const { searchParams } = new URL(req.url);
    const cleckID = searchParams.get("cleckID");
    if (!cleckID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Cleck ID is Missing",
        },
        { status: 400 }
      );
    }
    // Connect to database
    await connectDB();
    const user = await User.findOne({ _id: userID, cleckID: cleckID });
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "No User Found" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const updatedUser = await User.findByIdAndUpdate(userID, body, {
      new: true,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "User Updated Successfully",
        data: updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Updating User Data", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Updating User data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
// DETELET User Data
export async function DELETE(req, segmentData) {
  try {
    const { userID } = await segmentData.params;
    if (!userID) {
      return NextResponse.json(
        { status: "failed", message: "Missing User ID" },
        { status: 400 }
      );
    }
    // Cleck ID
    const { searchParams } = new URL(req.url);
    const cleckID = searchParams.get("cleckID");
    if (!cleckID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Cleck ID is Missing",
        },
        { status: 400 }
      );
    }
    // Connect to database
    await connectDB();
    const user = await User.findOne({ _id: userID, cleckID: cleckID });
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "No User Found" },
        { status: 400 }
      );
    }
    const deletedUser = await User.findByIdAndDelete(userID);
    return NextResponse.json(
      {
        status: "success",
        message: "User Deleted Successfully",
        data: deletedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Deleting User Data", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Deleting User data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
