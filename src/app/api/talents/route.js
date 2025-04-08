import Talent from "@/models/talent";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { talentSchema } from "@/validator/talents/talentSchema";
// import { auth } from "@clerk/nextjs/server";
// import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const filter = {};
    const { searchParams } = new URL(req.url);
    const searchKeyword = searchParams.get("keywords");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    // Search by Keywords
    if (searchKeyword) {
      filter.$or = [
        {
          title: { $regex: searchKeyword, $options: "i" },
        },
        {
          description: { $regex: searchKeyword, $options: "i" },
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
    const talent = await Talent.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return NextResponse.json({
      count: talent.length,
      status: "success",
      data: talent,
    });
  } catch (error) {
    console.log("Error Fetching the Use", error);
    return NextResponse.json({
      status: "failed",
      message: "Error Fetching the Use",
    });
  }
}
// POST request to create a new talent
export async function POST(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const clerkID = searchParams.get("userID");
    // TODO: get currently logged user
    // if (!userID && Types.ObjectId.isValid(userID)) {
    //   return NextResponse.json(
    //     {
    //       status: "failed",
    //       message: "Invalid or Missing User ID",
    //     },
    //     { status: 400 }
    //   );
    // }
    // if (!clerkID) {
    //   return NextResponse.json(
    //     {
    //       status: "failed",
    //       message: "Invalid or Missing Clerk ID",
    //     },
    //     { status: 400 }
    //   );
    // }
    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json(
        {
          status: "failed",
          message: "User not found",
        },
        { status: 404 }
      );
    }
    // Validate Talent data
    const body = await req.json();
    // const {userId} = await auth()
    // This clerk ID
    const data = { ...body, clerkID };
    const validatedData = talentSchema.parse(data);
    // Validate talent Title
    const existingTalent = await Talent.findOne({ title: validatedData.title });

    if (existingTalent) {
      return NextResponse.json(
        {
          status: "failed",
          message: "A talent with this title already exists!",
        },
        { status: 400 }
      );
    }
    // Create Talent
    const talent = await Talent.insertOne(validatedData);
    return NextResponse.json(
      {
        status: "success",
        message: "Talent Created Successfully",
        data: talent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error Creating the Talent", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error Creating the Talent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
