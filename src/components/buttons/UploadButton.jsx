import Link from "next/link";
import { MdCloudUpload } from "react-icons/md";

function UploadButton() {
  return (
    <Link
      href="/you/upload"
      className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-gray-200 hover:text-primary text-xs md:text-base px-4 py-2 border rounded shadow"
    >
      <MdCloudUpload size={20} />
      <span>Upload</span>
    </Link>
  );
}

export default UploadButton;
