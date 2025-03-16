"use client";
import { useState } from "react";
import { FiUser, FiMail, FiBell, FiLock, FiTrash2 } from "react-icons/fi";

export default function SponsorSettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    profilePicture: "https://source.unsplash.com/100x100/?portrait",
    notifications: true,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function toggleNotifications() {
    setProfile((prev) => ({ ...prev, notifications: !prev.notifications }));
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="flex items-center gap-4">
          <img src={profile.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
          <input type="file" className="border p-2 rounded-md" />
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <FiUser />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="flex-1 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <FiMail />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="flex-1 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notifications Toggle */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 flex items-center gap-2">
            <FiBell />
            Receive Notifications
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={profile.notifications} onChange={toggleNotifications} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <FiLock />
            <input type="password" placeholder="Current Password" className="flex-1 outline-none" />
          </div>
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <FiLock />
            <input type="password" placeholder="New Password" className="flex-1 outline-none" />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Update Password</button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
        <p className="text-gray-600">Deleting your account will remove all your data permanently.</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-3 flex items-center gap-2">
          <FiTrash2 />
          Delete Account
        </button>
      </div>
    </div>
  );
}
