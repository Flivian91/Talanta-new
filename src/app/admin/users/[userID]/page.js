import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";
import { FaBan } from "react-icons/fa";
import AdminUserAction from "@/components/dashboard/admin/users/AdminUserAction";
import AdminUserHeader from "@/components/dashboard/admin/users/AdminUserHeader";
import AdminUserInformations from "@/components/dashboard/admin/users/AdminUserInformations";
import AdminUserMinorDetails from "@/components/dashboard/admin/users/AdminUserMinorDetails";

export default function Page() {
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
        <div className="grid grid-cols-[2fr_0.5fr] gap-3">
        <AdminUserInformations />
        <AdminUserMinorDetails/>
        </div>
      </div>
    </div>
  );
}
