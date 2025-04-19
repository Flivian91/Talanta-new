import { BsArrowLeft } from "react-icons/bs";
import AdminUserAction from "@/components/dashboard/admin/users/AdminUserAction";
import AdminUserHeader from "@/components/dashboard/admin/users/AdminUserHeader";
import AdminUserInformations from "@/components/dashboard/admin/users/AdminUserInformations";
import AdminUserMinorDetails from "@/components/dashboard/admin/users/AdminUserMinorDetails";

export default async function Page({ params }) {
  const { userID } = await params;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 border-b border-gray-300/60 py-2">
          <div>
            <button className="flex items-center gap-2 border border-gray-300 px-2 py-1 rounded text-gray-600 text-sm hover:shadow">
              <BsArrowLeft />
              <span className="text-sm font-semibold">Back</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <AdminUserHeader />
            <AdminUserAction />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_300px]  gap-3">
          <AdminUserInformations />
          <AdminUserMinorDetails />
        </div>
      </div>
    </div>
  );
}
