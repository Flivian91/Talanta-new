// Get User by the ID.
// PATCH user by ID
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Gets a Single User
export async function GET(req, { params }) {
  try {
    const user = await (await clerkClient()).users.getUser(params.userID);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}
// Update User Data

export async function PATCH(req, segmentData) {
  try {
    const {userID} = await segmentData.params
    const { fname, lname, metadata } = await req.json();
    const updatedUser = await (
      await clerkClient()
    ).users.updateUser(userID, { firstName: fname, lastName: lname, publicMetadata: {role: metadata} });

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

// Delete User
export async function DELETE(req, segmentData) {
  try {
    const {userID} = await segmentData.params
    await (await clerkClient()).users.deleteUser(userID);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Delete User", error },
      { status: 404 }
    );
  }
}
