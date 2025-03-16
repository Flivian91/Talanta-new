import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const counts = await (await clerkClient()).users.getCount();
    return NextResponse.json({ counts, message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed To Fetch the counts", error },
      { status: 404 }
    );
  }
}
