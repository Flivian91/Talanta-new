import { databases, ID } from "@/utils/appwriteClient";
import { talentSchema } from "@/validator/talentSchema";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

// Create Talents
export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    // Zod Validation
    const result = talentSchema.safeParse(body);
    if (!result.success) {
      return new NextResponse(JSON.stringify(result.error.errors), {
        status: 400,
      });
    }

    const { title, description, videoUrl, thumbnailUrl, userId, categories } =
      result.data;

    const talent = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID,
      ID.unique(),
      {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        userId,
        categories,
      }
    );

    return new NextResponse(JSON.stringify(talent), { status: 201 });
  } catch (error) {
    console.error("Talent Creation Error:", error);
    return new NextResponse(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}

// Get all the document from the databases
export async function GET(req) {
  try {
    const talents = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TALENTS_COLLECTION_ID
    );

    return new NextResponse(JSON.stringify(talents), { status: 200 });
  } catch (error) {
    console.error("Fetch Talents Error:", error);
    return new NextResponse(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
