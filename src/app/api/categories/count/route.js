// Count the number of categories in the database

import { handleApiError } from "@/middleware/errorHandler";
import Category from "@/models/category";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized" },
        { status: 403 }
      );
    }
    const role = await sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return NextResponse.json(
        { status: "failed", message: "Forbidden only admin" },
        { status: 401 }
      );
    }
    await connectDB();
    const numCategories = await Category.countDocuments();
    return NextResponse.json(
      { status: "success", data: numCategories },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
