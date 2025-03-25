import { handleApiError } from "@/middleware/errorHandler";
import { userSchema } from "@/validator/users/userSchema";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const users = await (await clerkClient()).users.getUserList();
    if (users.data.length === 0) {
      return NextResponse.json(
        { status: "failed", message: "No Users Found" },
        { status: 400 }
      );
    }

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
    if (!newUser) {
      return NextResponse.json(
        { message: "Faild to create user" },
        { status: 404 }
      );
    }
    return NextResponse.json({ newUser, message: "Success" }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
