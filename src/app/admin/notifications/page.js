"use client";
import { useState } from "react";
import TimeAgo from "react-timeago";
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const dummyNotifications = [
  { id: 1, type: "info", message: "New sponsor joined the platform!", time: new Date(), read: false },
  { id: 2, type: "warning", message: "Pending approvals need your attention!", time: new Date(Date.now() - 5 * 60 * 1000), read: false },
  { id: 3, type: "success", message: "Talent approved successfully.", time: new Date(Date.now() - 3600 * 1000), read: true },
  { id: 4, type: "error", message: "System detected an issue!", time: new Date(Date.now() - 2 * 24 * 3600 * 1000), read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [filter, setFilter] = useState("all");

  // ✅ Mark all as read
  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  // ✅ Filtered Notifications
  const filteredNotifications = notifications.filter((n) =>
    filter === "all" ? true : filter === "unread" ? !n.read : n.read
  );

  // ✅ Notification Type Icons & Colors
  function getNotificationStyle(type) {
    switch (type) {
      // This is a comment
      case "success":
        return { icon: <FaCheckCircle className="text-green-500" />, bg: "bg-green-100" };
      case "warning":
        return { icon: <FaExclamationTriangle className="text-yellow-500" />, bg: "bg-yellow-100" };
      case "error":
        return { icon: <FaTimesCircle className="text-red-500" />, bg: "bg-red-100" };
      default:
        return { icon: <FaBell className="text-blue-500" />, bg: "bg-blue-100" };
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>

      {/* 📌 Filters & Actions */}
      <div className="flex items-center justify-between mb-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

        <button
          onClick={markAllRead}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Mark All as Read
        </button>
      </div>

      {/* 🔔 Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <p className="text-gray-600 text-center">No notifications available.</p>
        ) : (
          filteredNotifications.map((notif) => {
            const { icon, bg } = getNotificationStyle(notif.type);
            return (
              <div key={notif.id} className={`p-4 flex items-center rounded-lg shadow-md ${bg}`}>
                <div className="mr-3 text-2xl">{icon}</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{notif.message}</p>
                  <span className="text-gray-500 text-sm">
                    <TimeAgo date={notif.time} />
                  </span>
                </div>
              </div>
            );
            // this i new
          })
        )}
      </div>
    </div>
  );
}
