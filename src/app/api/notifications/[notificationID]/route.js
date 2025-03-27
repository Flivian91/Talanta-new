export async function PATCH(req) {
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

    const { notificationID } = await req.json();
    if (!notificationID) {
      return NextResponse.json(
        { error: "Notification IDs required" },
        { status: 400 }
      );
    }
    const notification = await Notification.findOne({
      _id: notificationID,
      recipientID: userID,
    });
    if (!notification) {
      return NextResponse.json(
        { status: "failed", message: "Notification not found" },
        { status: 404 }
      );
    }

    await Notification.updateOne(
      { _id: notificationID, recipientID: userID },
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

    const { notificationID } = await req.json();
    if (!notificationID)
      return NextResponse.json(
        { error: "Notification ID required" },
        { status: 400 }
      );

    await Notification.findOneAndDelete({
      _id: notificationID,
      recipientID: userID,
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