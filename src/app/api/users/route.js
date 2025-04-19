import { handleApiError } from "@/middleware/errorHandler";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { userSchema } from "@/validator/users/userSchema";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Ensure fallback values and convert to numbers
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const realOffset = (offset -1) * limit

    const users = await (await clerkClient()).users.getUserList({
      limit,
      offset:realOffset,
    });

    return NextResponse.json(
      { status: "success", data: users },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create New User
// BODY: id, fistname, lastName, emailAddress, PhoneNumber. password, publicMetadata='user'
export async function POST(req) {
  try {
    const body = await req.json();
    // Validate User Data
    const validatedData = userSchema.parse(body);
    const { firstName, lastName, email, password, role } = validatedData;
    const newUser = await (
      await clerkClient()
    ).users.createUser({
      externalId: uuidv4(),
      firstName,
      lastName,
      emailAddress: [email],
      password,
      publicMetadata: { role },
    });
    // Create new user on MongoDB
    await connectDB();
    await User.insertOne({
      clerkID: newUser.id,
      email,
      role,
      firstName,
      lastName,
      profileImage: newUser.imageUrl,
    });
    if (!newUser) {
      return NextResponse.json(
        { status: "failed", message: "Faild to create user" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: "success",
        message: "New user Created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
