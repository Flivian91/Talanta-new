import Link from "next/link";
import { IoCaretForwardOutline } from "react-icons/io5";
function DashboardButton({ link = "" }) {
  return (
    <Link
      href={`/${link}`}
      className="group relative w-full justify-center transition-all ease-in-out duration-500  flex items-center space-x-1 bg-gradient-to-b from-secondary to-secondaryDark/50 text-gray-100 hover:opacity-85 px-4 py-2  border rounded-md shadow"
    >
      <span className="text-sm font-semibold tracking-wide">Dashboard</span>
      <button className="transform translate-x-0 group-hover:translate-x-2 overflow-hidden">
        <IoCaretForwardOutline />
      </button>
    </Link>
  );
}

export default DashboardButton;
