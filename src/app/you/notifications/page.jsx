"use client";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  // Dummy notifications data (replace with real API data later)
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "Your video 'Amazing Nature' got 10 new likes!",
      timestamp: "2023-08-23T10:30:00Z",
    },
    {
      id: 2,
      type: "comment",
      message: "Alice commented on your upload: 'Amazing performance!'",
      timestamp: "2023-08-23T09:15:00Z",
    },
    {
      id: 3,
      type: "approval",
      message: "Your upload 'Tech Review 2022' has been approved!",
      timestamp: "2023-08-22T18:45:00Z",
    },
    {
      id: 4,
      type: "sponsorship",
      message: "New sponsorship opportunity available. Check it out!",
      timestamp: "2023-08-22T16:20:00Z",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: notification.id * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-800">{notification.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

