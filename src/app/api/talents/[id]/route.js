// Get Talent with a specific ID
// PATCH, DELETE Talent with Specific ID
import { databases } from "@/utils/appwriteClient";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Talent ID is required" }),
        {
          status: 400,
        }
      );
    }

    const talent = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      id
    );
    if (!talent) {
      return new NextResponse(JSON.stringify({ message: "Talent not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(talent), { status: 200 });
  } catch (error) {
    console.error("Fetch Talent Error:", error);
    return new Response(JSON.stringify({ message: "Talent not found" }), {
      status: 404,
    });
  }
}
