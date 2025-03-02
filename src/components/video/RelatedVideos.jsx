import React from "react";
import { allTalents } from "../data/talents";
import VideoCard from "../cards/VideoCard";

function RelatedVideos() {
  return (
    <div className="flex flex-col gap-3 px-2 py-2">
      <div>
        <h2 className="md:text-lg text-base font-semibold tracking-wider ">
          Related Videos
        </h2>
      </div>
      <div>
        {/* Grid of Talents */}
        {allTalents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allTalents.map((talent) => (
              <VideoCard key={talent.id} video={talent} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No talents found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default RelatedVideos;
