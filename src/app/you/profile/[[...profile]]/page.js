"use client";

import { useUser,UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between ">
        <h1 className=" text-xl md:text-2xl font-bold text-gray-800">
          My Profile
        </h1>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto p-2 md:p-3">
        <div className="mt-3 md:mt-8 flex items-center justify-center">
          {/* You can either build a custom profile form here or embed Clerk's UserProfile component */}
          <UserProfile appearance={{ elements: { rootBox: "p-0" } }} />
        </div>
      </main>
    </div>
  );
}
