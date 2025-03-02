import CommentSection from "@/components/video/CommentSection";
import RelatedVideos from "@/components/video/RelatedVideos";
import VideoActions from "@/components/video/VideoActions";
import VideoDescription from "@/components/video/VideoDescription";
import VideoInfo from "@/components/video/VideoInfo";
import VideoPlayer from "@/components/video/VideoPlayer";
import React from "react";

function WatchPage() {
  return (
    <div className="flex flex-col gap-4 md:px-2 md:py-4">
      <div className="relative grid gap-4 grid-cols-1 md:grid-cols-[3fr_350px]">
        <div className="flex flex-col gap-2">
          <VideoPlayer />
          <VideoInfo />
          <VideoDescription />
        </div>

        <div className="hidden md:block">
          <CommentSection />
        </div>
      </div>
      <div className="block md:hidden">
        <CommentSection />
      </div>
      <RelatedVideos />
    </div>
  );
}

export default WatchPage;
