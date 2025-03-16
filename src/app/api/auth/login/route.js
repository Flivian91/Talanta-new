import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const session = await auth().createSession({ email, password });
    console.log(session);
    

    return NextResponse.json({ message: "Login successful", session }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid credentials", error }, { status: 401 });
  }
}
