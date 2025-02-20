"use client";
import { useState } from "react";
import VideoGrid from "./VideoGrid";
import Sidebar from "../Sidebar";

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
          <VideoGrid />
        </main>
      </div>
    </>
  );
}

export default HomeLayoutGrid;
