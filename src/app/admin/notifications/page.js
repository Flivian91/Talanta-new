// src/app/admin/notifications/page.jsx
"use client";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { db } from "@/utils/appwrite";

export default function Notifications() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function sendNotification() {
    if (!message) return;
    setSending(true);

    try {
      await db.createDocument("database_id", "notifications_collection", {
        message,
        createdAt: new Date().toISOString(),
      });
      setMessage("");
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Send Notifications</h1>
      <textarea
        className="w-full p-3 border rounded"
        rows="4"
        placeholder="Enter notification message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
        onClick={sendNotification}
        disabled={sending}
      >
        {sending ? "Sending..." : "Send Notification"} <FiSend />
      </button>
    </div>
  );
}
