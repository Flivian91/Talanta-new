import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { ID, Query } from "appwrite";
import { databases } from "@/utils/appwriteClient";
import { talentSchema } from "@/validator/talentSchema";
import { handleApiError } from "@/middleware/errorHandler";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    if (!userID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Step 2: Parse and validate request body
    const body = await req.json();
    const validatedData = talentSchema.parse({
      ...body,
      userID: userID,
    });
    // Check if the video title exist
    const talentTitle = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      [Query.equal("title", validatedData.title)]
    );
    if (talentTitle.documents.length) {
      return NextResponse.json(
        { status: "failed", message: "Title Must be different" },
        { status: 404 }
      );
    }

    // ✅ Step 3: Store in Appwrite database
    const newTalent = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID, // Collection ID
      ID.unique(), // Generate unique ID
      validatedData // Talent data
    );

    return NextResponse.json(
      { message: "Talent uploaded successfully", talent: newTalent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return handleApiError(error);
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filterByUser = searchParams.get("userId");
    const showPending = searchParams.get("pending"); // Admin only

    let queries = [];

    // ✅ Filter: Only show approved talents unless "pending" is specified (admin only)
    if (showPending === "true") {
      queries.push(Query.equal("approved", false));
    } else {
      queries.push(Query.equal("approved", true));
    }

    // ✅ Filter by User ID
    if (filterByUser) {
      queries.push(Query.equal("userID", filterByUser));
    }

    // ✅ Fetch talents from Appwrite
    const talents = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID
    );
    console.log(JSON.stringify(queries));

    return NextResponse.json(
      { message: "Talents fetched successfully", talents: talents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Talents Error:", error);
    return handleApiError(error);
  }
}
