"use client";

import VideoCard from "@/components/cards/VideoCard";
import { motion } from "framer-motion";
import { useState } from "react";


/**
 * Example Subscriptions Page:
 * - Displays a list of subscribed channels (with subtle animations).
 * - Shows recent videos from the selected channel in a responsive grid.
 * - Uses Tailwind CSS for modern styling.
 * - Uses Framer Motion for animated transitions.
 */

export default function SubscriptionsPage() {
  // Dummy channels
  const channels = [
    {
      id: 1,
      name: "Music Maestro",
      avatar: "https://via.placeholder.com/60?text=Music",
    },
    {
      id: 2,
      name: "Dance Academy",
      avatar: "https://via.placeholder.com/60?text=Dance",
    },
    {
      id: 3,
      name: "Comedy Club",
      avatar: "https://via.placeholder.com/60?text=Comedy",
    },
    {
      id: 4,
      name: "Sports TV",
      avatar: "https://via.placeholder.com/60?text=Sports",
    },
  ];

  // Dummy videos from the selected channel
  const allVideos = [
    {
      id: 101,
      title: "Latest Vocal Showcase",
      channel: "Music Maestro",
      thumbnail: "https://via.placeholder.com/320x180?text=Music+Video",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      views: "45K views",
      published: "2 days ago",
      channelId: 1,
    },
    {
      id: 102,
      title: "Hip Hop Basics",
      channel: "Dance Academy",
      thumbnail: "https://via.placeholder.com/320x180?text=Dance+Video",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      views: "80K views",
      published: "5 days ago",
      channelId: 2,
    },
    {
      id: 103,
      title: "Stand-Up Comedy Night",
      channel: "Comedy Club",
      thumbnail: "https://via.placeholder.com/320x180?text=Comedy+Video",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      views: "120K views",
      published: "1 week ago",
      channelId: 3,
    },
    {
      id: 104,
      title: "Freestyle Football Tricks",
      channel: "Sports TV",
      thumbnail: "https://via.placeholder.com/320x180?text=Sports+Video",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      views: "200K views",
      published: "3 days ago",
      channelId: 4,
    },
  ];

  // State for the currently selected channel
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  // Filter videos by the selected channel
  const filteredVideos = allVideos.filter(
    (video) => video.channelId === selectedChannel.id
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Subscriptions</h1>

      {/* Channel List */}
      <motion.div
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {channels.map((channel) => (
          <motion.button
            key={channel.id}
            onClick={() => setSelectedChannel(channel)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition
              ${
                selectedChannel.id === channel.id
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{channel.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Section Title */}
      <motion.div
        className="mb-4"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold">
          Recent Videos from{" "}
          <span className="text-red-600">{selectedChannel.name}</span>
        </h2>
      </motion.div>

      {/* Videos Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <div className="col-span-full text-gray-600">
            No videos found for this channel.
          </div>
        )}
      </motion.div>
    </div>
  );
}
