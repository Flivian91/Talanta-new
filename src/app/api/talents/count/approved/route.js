import { handleApiError } from "@/middleware/errorHandler";
import { databases } from "@/utils/appwriteClient";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // ✅ Fetch talents from Appwrite
    const talents = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      [Query.equal("approved", true)]
    );

    return NextResponse.json(
      { status: "success", message: "Number of Approved Talents", total: talents.total },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Talents Error:", error);
    return handleApiError(error)
  }
}
