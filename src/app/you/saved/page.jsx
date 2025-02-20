"use client";
import VideoCard from "@/Components/cards/VideoCard";
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SavedVideosPage() {
  const { isSignedIn } = useUser();

  // Dummy data for saved videos (replace with real data/API call)
  const savedVideos = [
    {
      id: 1,
      title: "Saved Video 1",
      thumbnail: "https://via.placeholder.com/320x180?text=Saved+1",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Channel 1",
      views: "200K views",
      published: "3 days ago",
    },
    {
      id: 2,
      title: "Saved Video 2",
      thumbnail: "https://via.placeholder.com/320x180?text=Saved+2",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Channel 2",
      views: "150K views",
      published: "1 week ago",
    },
    {
      id: 3,
      title: "Saved Video 3",
      thumbnail: "https://via.placeholder.com/320x180?text=Saved+3",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Channel 3",
      views: "320K views",
      published: "2 days ago",
    },
    // Add more saved videos as needed
  ];

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700 mb-4">
          Please sign in to view your saved videos.
        </p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Saved Videos</h1>
      {savedVideos.length === 0 ? (
        <p className="text-gray-600">You haven't saved any videos yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {savedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
