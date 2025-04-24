import Notification from "@/models/notification";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
// Get all notifications
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    const searchKeyword = searchParams.get("keywords");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    // if (!userID || !Types.ObjectId.isValid(userID)) {
    //   return NextResponse.json(
    //     { status: "failed", message: "Invalid or Missing user ID" },
    //     { status: 400 }
    //   );
    // }
    const role = "admin";
    if (role !== "admin") {
      return NextResponse.json(
        { status: "failed", message: "Unauthorized only for admin" },
        { status: 401 }
      );
    }
    // connect to the database
    const filter = {};
    // Search by Keywords
    if (searchKeyword) {
      filter.type = {
        $eq: searchKeyword,
        $options: "i",
      };
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

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return NextResponse.json(
      { status: "success", data: notifications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Error fetching notifications", error },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectDB();
    // TODO: Get currently logged user
    // const { userId } = await auth();
    // if (!userId)
    //   return NextResponse.json({status: "failed", message: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    // Get Sender data
    const user = await (await clerkClient()).users.getUser(userID);
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "User not found" },
        { status: 404 }
      );
    }
    // Get Receiver data
    const { receiverID, type } = await req.json();
    const receiver = await (await clerkClient()).users.getUser(receiverID);
    if (!receiver) {
      return NextResponse.json(
        { status: "failed", message: "Receiver Not Found" },
        { status: 404 }
      );
    }
    // Ensure all the fields has values
    if (!receiverID || !type) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const isType = ["like", "comment", "follow", "share"].includes(type);
    if (!isType) {
      return NextResponse.json(
        { status: "failed", message: "Invalid notification type" },
        { status: 400 }
      );
    }
    let message = "";
    const userName =
      user.firstName ||
      user.lastName ||
      user.emailAddresses.at(0).emailAddress.split("@").at(0);
    // Check the type of notification and attach a custom message
    if (type === "like") {
      message = `${userName} liked your post`;
    } else if (type === "comment") {
      message = `${userName} commented on your post`;
    } else if (type === "follow") {
      message = `${userName} followed you`;
    } else if (type === "share") {
      message = `${userName} shared your post`;
    }
    // You cannot send Notification to yourself
    if (user.id === receiver.id) {
      return NextResponse.json(
        {
          status: "failed",
          message: "You cannot send notification to yourself",
        },
        { status: 400 }
      );
    }
    const notification = await Notification.insertOne({
      receiverID: receiver.id,
      senderID: user.id,
      type,
      message,
    });

    return NextResponse.json(
      { status: "success", message: "Notification sent!", data: notification },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Error creating notification", error },
      { status: 500 }
    );
  }
}
