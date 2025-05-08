"use client";
import VideoCard from "@/components/cards/VideoCard";
import HomeTalentsSkeleton from "@/components/common/HomeTalentsSkeleton";
import LoadingWatchSkeleton from "@/components/common/LoadingWatchSkeleton";
import CommentSection from "@/components/video/CommentSection";
import RelatedVideos from "@/components/video/RelatedVideos";
import VideoActions from "@/components/video/VideoActions";
import VideoDescription from "@/components/video/VideoDescription";
import VideoInfo from "@/components/video/VideoInfo";
import VideoPlayer from "@/components/video/VideoPlayer";
import { useSingleTalent } from "@/hooks/useGetSingleTalent";
import { useTalents } from "@/hooks/useTalents";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function WatchPage() {
  const { talentID } = useParams();
  // Get current talent by talentID
  const {
    data: talent,
    error: talentError,
    isLoading: loadingTalent,
  } = useSingleTalent(talentID);

  const {
    data: talents,
    error: talentsError,
    isLoading: loadingTalents,
  } = useTalents({ limit: 10 });

  const category = talent?.data?.categories.at(0);
  const relatedTalents = talents?.data.filter((t) =>
    t.categories.includes(category)
  );

  if (talentError) {
    console.log("Error Fetcing Talent data", talentError);
  }
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
      {/* Grid of Talents */}
      {loadingTalents ? (
        <HomeTalentsSkeleton />
      ) : relatedTalents?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedTalents?.map((talent) => (
            <VideoCard key={talent.id} video={talent} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No talents found in this category.</p>
      )}
    </div>
  );
}

export default WatchPage;
