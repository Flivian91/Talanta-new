import { handleApiError } from "@/middleware/errorHandler";
import Notification from "@/models/notification";
import connectDB from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req, segmentData) {
  try {
    await connectDB();
    const { notificationID } = await segmentData.params;
    // TODO: Get currently logged user
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { status: "failed", message: "Unauthorized Access" },
        { status: 401 }
      );
    const notification = await Notification.findById(notificationID);
    if (!notification) {
      return NextResponse.json(
        { status: "failed", message: "Notification not found" },
        { status: 404 }
      );
    }
    await Notification.findByIdAndUpdate(notificationID, { read: true });
    return NextResponse.json(
      { message: "Notifications marked as read!" },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
export async function DELETE(req, segmentData) {
  try {
    await connectDB();
    const { notificationID } = await segmentData.params;
    // const { userId } = auth();
    // if (!userId)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const notification = await Notification.findById(notificationID);
    if (!notification) {
      return NextResponse.json(
        { status: "failed", message: "Notification not found" },
        { status: 404 }
      );
    }
    await Notification.findByIdAndDelete(notificationID);

    return NextResponse.json(
      { message: "Notification deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
