import Notification from "@/models/notification";
import User from "@/models/user";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    // const { userId } = auth();
    // if (!userId)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or Missing user ID" },
        { status: 400 }
      );
    }
    // Verify if user Exists
    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "User not found" },
        { status: 404 }
      );
    }
    const { recipientID, type, relatedID } = await req.json();
    if (!Types.ObjectId.isValid(recipientID)) {
      return NextResponse.json(
        { status: "failed", message: "Invalid recipient ID" },
        { status: 400 }
      );
    }
    if (!recipientID || !type) {
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
    // Check the type of notification and attach a custom message
    if (type === "like") {
      message = `${user.firstName} liked your post`;
    } else if (type === "comment") {
      message = `${user.firstName} commented on your post`;
    } else if (type === "follow") {
      message = `${user.firstName} followed you`;
    } else if (type === "share") {
      message = `${user.firstName} shared your post`;
    }
    // You cannot send Notification to yourself
    if (userID === recipientID) {
      return NextResponse.json(
        {
          status: "failed",
          message: "You cannot send notification to yourself",
        },
        { status: 400 }
      );
    }
    const notification = await Notification.insertOne({
      recipientID,
      senderID: userID,
      type,
      message,
      relatedID,
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

export async function PATCH(req) {
  try {
    await connectDB();
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { notificationIDs } = await req.json();
    if (!notificationIDs || !notificationIDs.length) {
      return NextResponse.json(
        { error: "Notification IDs required" },
        { status: 400 }
      );
    }

    await Notification.updateMany(
      { _id: { $in: notificationIDs }, recipientID: userId },
      { read: true }
    );

    return NextResponse.json(
      { message: "Notifications marked as read!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating notifications", details: error },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    await connectDB();
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { notificationID } = await req.json();
    if (!notificationID)
      return NextResponse.json(
        { error: "Notification ID required" },
        { status: 400 }
      );

    await Notification.findOneAndDelete({
      _id: notificationID,
      recipientID: userId,
    });

    return NextResponse.json(
      { message: "Notification deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting notification", details: error },
      { status: 500 }
    );
  }
}
