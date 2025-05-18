"use client";
import { useState } from "react";
import Sidebar from "../Sidebar";
import VideoGrid from "./VideoGrid";

function HomeLayoutGrid() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="flex flex-1">
        <Sidebar
          toogleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main
          className={`min-h-min  w-full mt-20 ${
            sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20 "
          }`}
        >
          {/* This is the new release for today */}
          <VideoGrid />
        </main>
      </div>
    </>
  );
}

export default HomeLayoutGrid;
