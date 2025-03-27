import { currentUser } from "@clerk/nextjs/server";
import connectDB from "./db";

export async function syncUser() {
  try {
    await connectDB(); // Connect to MongoDB

    // Get the logged-in user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) return null; // No user found

    // Extract relevant user data
    const userData = {
      clerkID: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.username || clerkUser.firstName, // Use firstName if no username
      role: clerkUser.publicMetadata.role || "user",
      profileImage: clerkUser.imageUrl,
    };
    

    // Check if user exists in MongoDB
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      // Create a new user if not found
      user = await User.create(userData);
    }

    return user; // Return the user object
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
}
