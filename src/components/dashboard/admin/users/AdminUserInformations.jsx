"use client";
import { useState } from "react";
import Image from "next/image";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ProfileSection() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [avatar, setAvatar] = useState("/default-avatar.png"); // Change to your actual image path
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setAvatar(imageUrl);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4 py-3 px-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Personal Information
        </h2>
        <FaExclamationTriangle className="text-orange-500" />
      </div>

      {/* Profile Info Section */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <Image
              src={avatar}
              alt="Avatar"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <label className="mt-2 border border-gray-300 text-sm px-3 py-1 shadow rounded cursor-pointer">
            Update avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Recommended size: 1:1, up to 2MB
          </p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="fname"
                className="text-sm text-gray-600 font-medium"
              >
                First name
              </label>
              <input
                type="text"
                id="fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-secondary/10 outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lname"
                className="text-sm text-gray-600 font-medium"
              >
                Last name
              </label>
              <input
                type="text"
                id="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-secondary/10 outline-none"
              />
            </div>
          </div>

          {isEditing ? (
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border px-3 py-2 rounded focus:ring focus:ring-secondary/10 outline-none font-mono tracking-wide caret-secondary"
            >
              <option value="user">User</option>
              <option value="sponsor">Sponsor</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <div className="bg-gray-50 rounded-md py-2 px-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold tracking-wide">
                  role :
                </h3>
                <span className="font-mono tracking-wide">"sponsor"</span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-accent/40 rounded text-sm font-semibold"
              >
                Edit
              </button>
            </div>
          )}

          <div className="flex items-center justify-center">
            <button className="bg-secondary text-white px-4 py-2 rounded">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
