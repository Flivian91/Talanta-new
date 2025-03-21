// Get Talent with a specific ID
// PATCH, DELETE Talent with Specific ID
import { handleApiError } from "@/middleware/errorHandler";
import { databases } from "@/utils/appwriteClient";
import { talentUpdateSchema } from "@/validator/talents/talentSchema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, segmentData) {
  try {
    const { id } = await segmentData.params;

    if (!id) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Talent ID is required",
        },
        { status: 404 }
      );
    }

    const talent = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      id
    );
    if (!talent) {
      return NextResponse.json({ message: "No Talent Found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", talent }, { status: 200 });
  } catch (error) {
    console.error("Fetch Talent Error:", error);
    return handleApiError(error);
  }
}
// Update Talent
export async function PATCH(req, segmentData) {
  try {
    // ✅ Step 1: Get logged-in user
    const { userId: userID, sessionClaims } = await auth();
    console.log(userID);

    if (!userID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Step 2: Validate request data
    const body = await req.json();
    const validatedData = talentUpdateSchema.parse(body);

    // ✅ Step 3: Fetch existing talent
    const { id: talentID } = await segmentData.params;
    const talent = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      talentID
    );
    if (!talent) {
      return NextResponse.json(
        { message: "Talent not found" },
        { status: 404 }
      );
    }
    // ✅ Step 4: Ensure user owns the talent or is an admin
    const isAdmin = sessionClaims?.roles?.includes("admin");
    console.log(sessionClaims?.metadata?.role);

    if (talent.userID !== userID && !isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    // ✅ Step 5: Update talent
    const updatedTalent = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      talentID,
      validatedData
    );

    return NextResponse.json(
      { message: "Talent updated successfully", talent: updatedTalent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Talent Error:", error);
    return NextResponse.json(
      { message: "Failed to update talent", error: error.message },
      { status: 500 }
    );
  }
}

// Delte Talent
export async function DELETE(req, segmentData) {
  try {
    const { userId: userID, sessionClaims } = await auth();
    const { id: talentID } = await segmentData.params;
    if (!userID) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!talentID) {
      return NextResponse.json(
        { status: "failed", message: "Talent ID is required" },
        { status: 404 }
      );
    }
    //  Step 4: Ensure user owns the talent or is an admin
    const isAdmin = sessionClaims?.roles?.includes("admin");
    if (talent.userId !== userId && !isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const talent = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      userID
    );
    if (!talent) {
      return NextResponse.json(
        { status: "failed", message: "Talent Not Found" },
        { status: 404 }
      );
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      userID
    );
    return NextResponse.json(
      { status: "success", message: "Talent Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    handleApiError(error);
  }
}
