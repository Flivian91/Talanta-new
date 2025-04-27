

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { MdPlaylistAddCheck, MdPlaylistAdd } from "react-icons/md";

// Dummy Video Data (Replace with API Fetch Later)
const videos = [
  {
    id: 1,
    title: "Amazing Nature",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    channel: "Nature Channel",
    views: "1M views",
    published: "1 week ago",
    description: "A beautiful nature video showing different landscapes.",
    comments: [
      { user: "Alice", text: "Amazing video! 🌿" },
      { user: "Bob", text: "This is so relaxing! 🎶" },
    ],
  },
];

export default function WatchPage() {
  const { id } = useParams(); // Get video ID from URL
  const { isSignedIn, user } = useUser(); // Clerk Auth
  const [comment, setComment] = useState("");
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(125); // Dummy Like Count
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Find video by ID (Simulating Fetch)
    const selectedVideo = videos.find((v) => v.id === parseInt(id));
    if (selectedVideo) {
      setVideo(selectedVideo);
    }
  }, [id]);

  if (!video) {
    return <div className="text-center text-gray-500 mt-10">Video not found</div>;
  }

  // Handle Like Toggle (Only Authenticated Users)
  const handleLike = () => {
    if (!isSignedIn) return alert("You need to sign in to like videos.");
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Handle Save to Playlist Toggle (Only Authenticated Users)
  const handleSave = () => {
    if (!isSignedIn) return alert("You need to sign in to save videos.");
    setSaved(!saved);
  };

  // Handle Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide "Copied" message after 2s
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Video Player */}
        <div className="bg-black rounded overflow-hidden">
          <video controls className="w-full h-[70vh] rounded-lg">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info & Interaction Buttons */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <div className="flex justify-between items-center mt-2">
            <div className="text-gray-600">
              {video.views} • {video.published}
            </div>
            <UserButton />
          </div>
          <hr className="my-4" />
          <p className="text-gray-700">{video.description}</p>

          {/* Like, Save, and Share Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            {/* Like Button (Only Authenticated) */}
            {isSignedIn ? (
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                } transition hover:bg-blue-600`}
              >
                {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                <span>{likes}</span>
              </button>
            ) : (
              <SignInButton>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                  <AiOutlineLike size={20} />
                  <span>{likes}</span>
                  <span className="ml-2 text-sm">(Sign in to Like)</span>
                </button>
              </SignInButton>
            )}

            {/* Save to Playlist (Only Authenticated) */}
            {isSignedIn ? (
              <button
                onClick={handleSave}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  saved ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                } transition hover:bg-green-600`}
              >
                {saved ? <MdPlaylistAddCheck size={20} /> : <MdPlaylistAdd size={20} />}
                <span>{saved ? "Saved" : "Save"}</span>
              </button>
            ) : (
              <SignInButton>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                  <MdPlaylistAdd size={20} />
                  <span>Save</span>
                  <span className="ml-2 text-sm">(Sign in to Save)</span>
                </button>
              </SignInButton>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg transition hover:bg-gray-300"
            >
              <AiOutlineShareAlt size={20} />
              <span>{copied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Comments Section (Only Authenticated Users) */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Comments</h2>

          {isSignedIn ? (
            <>
              {/* Comment Input */}
              <div className="flex items-center mt-4 space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (comment.trim()) {
                      setVideo((prev) => ({
                        ...prev,
                        comments: [...prev.comments, { user: user.fullName, text: comment }],
                      }));
                      setComment(""); // Clear input
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Post
                </button>
              </div>
              {/* List of Comments */}
              <div className="mt-4 space-y-3">
                {video.comments.map((c, index) => (
                  <div key={index} className="p-3 bg-gray-100 rounded-lg">
                    <strong className="text-gray-800">{c.user}:</strong>
                    <p className="text-gray-600">{c.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              <p>You need to be signed in to comment.</p>
              <SignInButton>
                <button className="text-blue-500 underline">Sign In</button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
