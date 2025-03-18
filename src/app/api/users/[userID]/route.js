// Get User by the ID.
// PATCH user by ID
import { handleApiError } from "@/middleware/errorHandler";
import { updateUserSchema } from "@/validator/users/userSchema";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Gets a Single User
export async function GET(req, segmentData) {
  try {
    const { userID } = await segmentData.params;
    const user = await (await clerkClient()).users.getUser(userID);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
// Update User Data
export async function PATCH(req, segmentData) {
  try {
    const { userID } = await segmentData.params; // Fix: Access params correctly
    console.log(userID);

    const body = await req.json();

    // ✅ Validate request data (allowing partial updates)
    const validatedData = updateUserSchema.parse(body);

    // ✅ Ensure the user exists before updating
    const existingUser = await (await clerkClient()).users.getUser(userID);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Update only provided fields
    const updatedUser = await (
      await clerkClient()
    ).users.updateUser(userID, {
      ...validatedData,
      publicMetadata: { role: validatedData.role }, // Ensure metadata is properly updated
    });

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error); // ✅ Global error handling
  }
}

// Delete User
export async function DELETE(req, segmentData) {
  try {
    const { userID } = await segmentData.params;
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
