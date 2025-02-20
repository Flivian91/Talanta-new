import Header from "@/Components/Header";
import HomeLayoutGrid from "@/Components/layouts/HomeLayoutGrid";

// src/app/page.js
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-30">
        <Header />
      </div>
      <HomeLayoutGrid />
    </div>
  );
}
