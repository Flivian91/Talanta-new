"use client";
import VideoCard from "@/Components/cards/VideoCard";

export default function TrendingPage() {
  // Dummy trending video data (replace with API data later)
  const trendingVideos = [
    {
      id: 1,
      title: "Trending: Amazing Nature",
      thumbnail: "https://via.placeholder.com/320x180?text=Nature+Trending",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Nature Channel",
      views: "1.5M views",
      published: "3 days ago",
    },
    {
      id: 2,
      title: "Trending: Tech Innovations 2023",
      thumbnail: "https://via.placeholder.com/320x180?text=Tech+Trending",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Tech Guru",
      views: "2M views",
      published: "1 week ago",
    },
    {
      id: 3,
      title: "Trending: Ultimate Travel Vlog",
      thumbnail: "https://via.placeholder.com/320x180?text=Travel+Trending",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Wanderlust",
      views: "3M views",
      published: "2 days ago",
    },
    {
      id: 4,
      title: "Trending: Amazing DIY Projects",
      thumbnail: "https://via.placeholder.com/320x180?text=DIY+Trending",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "Creative Corner",
      views: "750K views",
      published: "5 days ago",
    },
    {
      id: 5,
      title: "Trending: Gaming Highlights",
      thumbnail: "https://via.placeholder.com/320x180?text=Gaming+Trending",
      hoverThumbnail:
        "https://via.placeholder.com/320x180/000000/ffffff?text=Playing...",
      channel: "GameZone",
      views: "4M views",
      published: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Trending Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
