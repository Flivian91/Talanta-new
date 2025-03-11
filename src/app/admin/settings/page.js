// src/app/admin/settings/page.jsx
"use client";
import { useState } from "react";
import { FiSave } from "react-icons/fi";

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
  });

  function updateSettings(e) {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  }

  function saveSettings() {
    alert("Settings saved successfully!");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="checkbox"
          id="darkMode"
          name="darkMode"
          checked={settings.darkMode}
          onChange={updateSettings}
        />
        <label htmlFor="darkMode">Enable Dark Mode</label>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="checkbox"
          id="emailNotifications"
          name="emailNotifications"
          checked={settings.emailNotifications}
          onChange={updateSettings}
        />
        <label htmlFor="emailNotifications">Enable Email Notifications</label>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={saveSettings}
      >
        Save Settings <FiSave />
      </button>
    </div>
  );
}
