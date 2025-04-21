// GET and POST

import Category from "@/models/category";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    // TODO get currently logged in user
    const categories = await Category.find().sort({createdAt: -1});
    return NextResponse.json(
      { status: "success", data: categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Fetching Categories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Create New Categories
export async function POST(req) {
  try {
    await connectDB();
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json(
        { status: "failed", message: "Category Title is required" },
        { status: 400 }
      );
    }
    const role = "admin";
    if (role !== "admin") {
      return NextResponse.json(
        {
          status: "failed",
          message: "You are not authorized to create a category",
        },
        { status: 401 }
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
    return NextResponse.json(
      {
        status: "failed",
        message: "Error in Creating Category",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
