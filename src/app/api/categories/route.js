// GET and POST

import { handleApiError } from "@/middleware/errorHandler";
import Category from "@/models/category";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    // TODO get currently logged in user
    // GEt currently Logged in User
    // const { userId } = await auth();
    // if (!userId) {
    //   return NextResponse.json(
    //     { status: "failed", message: "Unauthorized Access" },
    //     { status: 401 }
    //   );
    // }
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { status: "success", data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching Categories", error);
    return handleApiError(error);
  }
}

// Create New Categories
export async function POST(req) {
  try {
    // GEt currently Logged in User
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    // Only Admin can UPDATE category
    const role = await sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return NextResponse.json(
        { status: "failed", message: "Permission Denied(only admins)" },
        { status: 403 }
      );
    }
    await connectDB();
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json(
        { status: "failed", message: "Category Title is required" },
        { status: 400 }
      );
    }
    // Check if the category exists
    const extstingCategory = await Category.find({ title });
    if (extstingCategory) {
      return NextResponse.json(
        { status: "failed", message: "Category already Exists!!" },
        { status: 400 }
      );
    }

    const newCategory = await Category.insertOne({ title });
    return NextResponse.json(
      {
        status: "success",
        message: "Category Created Successfully",
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Creating a Category", error);
    return handleApiError(error);
  }
}
