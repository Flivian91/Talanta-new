"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function UploadTalentPage() {
  const { isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Simulate an upload process (replace with API call later)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !file) {
      setMessage("Please fill in all required fields.");
      return;
    }
    setUploading(true);
    setMessage("");
    // Simulate network delay for uploading...
    setTimeout(() => {
      setUploading(false);
      setMessage("Talent uploaded successfully!");
      // Reset form fields
      setTitle("");
      setCategory("");
      setDescription("");
      setFile(null);
      setPreview(null);
    }, 2000);
  };

  // If user is not signed in, prompt to sign in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700 mb-4">
          Please sign in to upload your talent.
        </p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Upload Your Talent</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl transition-transform transform hover:scale-105"
      >
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your talent title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Dance">Dance</option>
            <option value="Art">Art</option>
            <option value="Comedy">Comedy</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter a brief description (optional)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Video or Photo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="video/*, image/*"
            className="w-full text-gray-700"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Message Feedback */}
        {message && (
          <div className="mb-4 text-center text-lg text-blue-500">{message}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Talent"}
        </button>
      </form>
    </div>
  );
}
