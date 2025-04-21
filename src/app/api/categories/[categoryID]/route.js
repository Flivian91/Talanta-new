//GET, PATCH and DELETE

import { handleApiError } from "@/middleware/errorHandler";
import Category from "@/models/category";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// Get A single Category
export async function GET(req, segmentData) {
  try {
       // GEt currently Logged in User
       const { userId } = await auth();
       if (!userId) {
         return NextResponse.json(
           { status: "failed", message: "Unauthorized Access" },
           { status: 401 }
         );
       }
    // Fetch Category ID from URl
    const { categoryID } = await segmentData.params;
    if (!categoryID || !Types.ObjectId.isValid(categoryID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or missing category ID" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    // Find the Category with ID
    const category = await Category.findOne({ _id: categoryID });
    if (!category) {
      return NextResponse.json(
        { status: "failed", message: "No Category Found" },
        { status: 400 }
      );
    }
    // return Success
    return NextResponse.json(
      { status: "success", data: category },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching User", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Fetching User",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Update Category data
export async function PATCH(req, segmentData) {
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
    // Fetch category ID from the url
    const { categoryID } = await segmentData.params;
    if (!categoryID || !Types.ObjectId.isValid(categoryID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or missing category ID" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    // Check if category exists
    const category = await Category.findOne({ _id: categoryID });
    if (!category) {
      return NextResponse.json(
        { status: "failed", message: "No category Found" },
        { status: 404 }
      );
    }
    // Update Category
    const body = await req.json();
    const newCategory = await Category.findByIdAndUpdate(categoryID, body, {
      upsert: false,
      new: true,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Category Updated Successfully",
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Updating Category", error);
    return handleApiError(error);
  }
}
// DELETE Category
export async function DELETE(req, segmentData) {
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
    // Get the Category ID from the URL
    const { categoryID } = await segmentData.params;
    if (!categoryID || !Types.ObjectId.isValid(categoryID)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Invalid or missing category ID",
        },
        { status: 400 }
      );
    }
    // Connect to database
    await connectDB();
    // Get the category to be deleted
    const category = await Category.findOne({ _id: categoryID });
    if (!category) {
      return NextResponse.json(
        { status: "failed", message: "No category Found" },
        { status: 400 }
      );
    }
    // Delete the Category
    const deletedCategory = await Category.findByIdAndDelete(categoryID);
    return NextResponse.json(
      {
        status: "success",
        message: "Category Deleted successfully",
        data: deletedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Deleting Category", error);
    return handleApiError(error);
  }
}
