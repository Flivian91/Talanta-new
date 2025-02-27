import CommentSection from "@/components/video/CommentSection";
import RelatedVideos from "@/components/video/RelatedVideos";
import VideoActions from "@/components/video/VideoActions";
import VideoInfo from "@/components/video/VideoInfo";
import VideoPlayer from "@/components/video/VideoPlayer";
import React from "react";

function WatchPage() {
  return (
    <div className="flex flex-col gap-4 md:px-2 md:py-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr_350px]">
        <VideoPlayer />
        <VideoInfo />
        <CommentSection />
      </div>

      <VideoActions />
      <RelatedVideos />
    </div>
  );
}

export default WatchPage;
