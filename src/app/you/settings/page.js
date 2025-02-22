"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  // State for different toggles and selections
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  // Handler for saving settings (replace with an API call as needed)
  const handleSave = () => {
    // Save settings logic goes here
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </header>

      {/* Settings Form */}
      <div className="container mx-auto p-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>

          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Dark Mode</label>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  darkMode ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Email Notifications
              </label>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  emailNotifications ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Push Notifications
              </label>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  pushNotifications ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    pushNotifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
