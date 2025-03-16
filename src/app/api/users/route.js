import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const users = await (await clerkClient()).users.getUserList();
    if (users.data.length === 0) {
      return NextResponse.json({ message: "No Users Found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Clerk API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
}
// Create New User
// BODY: id, fistname, lastName, emailAddress, PhoneNumber. password, publicMetadata='user'
export async function POST(req) {
  try {
    // Validate the information firstName

    const { firstName, lastName, email, password } = await req.json();
    console.log(email);

    const data = await (
      await clerkClient()
    ).users.createUser({
      externalId: uuidv4(),
      firstName,
      publicMetadata: { role: "user" },
      lastName,
      emailAddress: email,
      password,
    });
    if (!data) {
      return NextResponse.json(
        { message: "Faild to create user" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create a User", error },
      { status: 500 }
    );
  }
}
