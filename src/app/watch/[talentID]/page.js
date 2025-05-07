"use client";
import LoadingWatchSkeleton from "@/components/common/LoadingWatchSkeleton";
import CommentSection from "@/components/video/CommentSection";
import RelatedVideos from "@/components/video/RelatedVideos";
import VideoActions from "@/components/video/VideoActions";
import VideoDescription from "@/components/video/VideoDescription";
import VideoInfo from "@/components/video/VideoInfo";
import VideoPlayer from "@/components/video/VideoPlayer";
import { useSingleTalent } from "@/hooks/useGetSingleTalent";
import { useParams } from "next/navigation";
import React from "react";

function WatchPage() {
  const { talentID } = useParams();
  // Get current talent by talentID
  const {
    data: talent,
    error: talentError,
    isLoading: loadingTalent,
  } = useSingleTalent(talentID);

  return (
    <div className="flex flex-col gap-4 md:px-2 md:py-4">
      {loadingTalent ? (
        <LoadingWatchSkeleton />
      ) : (
        <>
          <div className="relative grid gap-4 grid-cols-1 md:grid-cols-[3fr_350px]">
            <div className="flex flex-col gap-2">
              <VideoPlayer videoUrl={talent?.data?.videoUrl} />
              <VideoInfo data={talent?.data} />
              <VideoDescription data={talent?.data} />
            </div>

            <div className="hidden md:block">
              <CommentSection />
            </div>
          </div>
          <div className="block md:hidden">
            <CommentSection />
          </div>
        </>
      )}
      <RelatedVideos />
    </div>
  );
}

export default WatchPage;
