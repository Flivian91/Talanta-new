import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function AdminMainLayout({ children }) {
  return (
    <div>
      {/* sidebar */}
      <div className="fixed top-0 left-0   z-30 w-0 md:w-64 hidden md:block">
        <SidebarAdmin />
      </div>
      <div className="fixed top-0 left-0 md:left-64 bg-accent w-full">
        <HeaderAdmin />
      </div>
      {/* header */}
      <main className="md:ml-64 mt-12 bg-gray-200 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default AdminMainLayout;
