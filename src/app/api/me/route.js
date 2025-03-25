import User from "@/models/user";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

// Get User data
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchKeyword = searchParams.get("keywords");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    // connect to the database

    const filter = {};
    // Search by Keywords
    if (searchKeyword) {
      filter.$or = [
        {
          firstName: { $regex: searchKeyword, $options: "i" },
        },
        {
          lastName: { $regex: searchKeyword, $options: "i" },
        },
      ];
    }
    // Filter
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }
    const skip = ((page || 1) - 1) * (limit || 10);
    await connectDB();
    const user = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "No user Found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching User(me)", error);
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
// Create New User
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cleckID = searchParams.get("cleckID");
    if (!cleckID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Cleck ID is Missing",
        },
        { status: 400 }
      );
    }
    const body = await req.json();
    const data = { ...body, cleckID };
    // Connect to DB
    await connectDB();

    const newUser = await User.insertOne(data);
    return NextResponse.json(
      {
        status: "success",
        message: "User Created Successfully",
        data: newUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Creating User(me)", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Creating User(me)",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
