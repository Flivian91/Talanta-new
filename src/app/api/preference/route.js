import Preference from "@/models/preference";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Get User Preference based on user ID from client side and Session
export async function GET(req) {
  try {
    // TODO: get currently logged user
    // const {userId} = await auth()
    // if (!userId)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const preferenceID = searchParams.get("preferenceID");
    if (!preferenceID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Preference ID is Missing",
        },
        { status: 400 }
      );
    }
    await connectDB();
    const preferences = await Preference.findById(preferenceID);

    if (!preferences)
      return NextResponse.json(
        { status: "failed", message: "Preferences not found" },
        { status: 404 }
      );

    return NextResponse.json({ preferences });
  } catch (error) {
    console.log("Error Fetching User Preference data", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Fetching User Preference Data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    // TODO: get currently logged user
    // const {userId} = await auth() //as cleckID
    const { searchParams } = new URL(req.url);
    const preferenceID = searchParams.get("preferenceID");
    if (!preferenceID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Preference ID is Missing",
        },
        { status: 400 }
      );
    }
    // if (!userId)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const preference = await Preference.findById(preferenceID);
    if (!preference) {
      return NextResponse.json(
        {
          status: "failed",
          message: "No User Preference Found",
        },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Update preferences
    const updatedPreferences = await Preference.findByIdAndUpdate(
      preferenceID,
      body,
      { new: true }
    );
    return NextResponse.json({
      status: "success",
      message: "Preferences Updated",
      updatedPreferences,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to update preferences",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
