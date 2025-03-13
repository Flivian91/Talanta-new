"use client";
import { useState } from "react";
import { FaUser, FaBell, FaPalette, FaLock } from "react-icons/fa";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

      {/* 📌 Sidebar Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Settings Menu</h2>
          <ul className="space-y-2">
            <SettingTab icon={<FaUser />} label="Profile" tab="profile" setTab={setTab} activeTab={tab} />
            <SettingTab icon={<FaBell />} label="Notifications" tab="notifications" setTab={setTab} activeTab={tab} />
            <SettingTab icon={<FaPalette />} label="Appearance" tab="appearance" setTab={setTab} activeTab={tab} />
            <SettingTab icon={<FaLock />} label="Security" tab="security" setTab={setTab} activeTab={tab} />
          </ul>
        </div>

        {/* 📌 Content Section */}
        <div className="md:col-span-3 bg-white shadow-md p-6 rounded-lg">
          {tab === "profile" && <ProfileSettings />}
          {tab === "notifications" && <NotificationSettings />}
          {tab === "appearance" && <AppearanceSettings />}
          {tab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

// 📌 Sidebar Tab Component
function SettingTab({ icon, label, tab, setTab, activeTab }) {
  return (
    <li
      onClick={() => setTab(tab)}
      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition ${
        activeTab === tab ? "bg-blue-500 text-white" : "hover:bg-gray-200"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </li>
  );
}

// 📌 Profile Settings Section
function ProfileSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
      <p className="text-gray-600">Manage your account details and update your profile information.</p>
      {/* Add Profile Update Form Here */}
    </div>
  );
}

// 📌 Notification Settings Section
function NotificationSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
      <p className="text-gray-600">Control what notifications you receive.</p>
      {/* Add Toggle Switches for Notifications Here */}
    </div>
  );
}

// 📌 Appearance Settings Section
function AppearanceSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Appearance Settings</h2>
      <p className="text-gray-600">Customize the theme and layout of your dashboard.</p>
      {/* Add Theme Selection Here */}
    </div>
  );
}

// 📌 Security Settings Section
function SecuritySettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Security & Privacy</h2>
      <p className="text-gray-600">Manage passwords, two-factor authentication, and privacy settings.</p>
      {/* Add Security Options Here */}
    </div>
  );
}
