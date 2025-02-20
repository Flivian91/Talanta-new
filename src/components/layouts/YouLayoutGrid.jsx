"use client";
import { useState } from "react";
import Sidebar from "../Sidebar";

function YouLayoutGrid({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="">
        <Sidebar
          toogleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      </div>
      <main
        className={`min-h-min mt-16 ${sidebarOpen ? " ml-0 md:ml-64" : "ml-0 md:ml-20"}`}
      >
        {children}
      </main>
    </>
  );
}

export default YouLayoutGrid;
