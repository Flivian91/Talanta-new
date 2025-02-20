import Link from "next/link";
import { MdCloudUpload } from "react-icons/md";

function UploadButton() {
  return (
    <Link
      href="/you/upload"
      className="flex items-center space-x-1 bg-secondary text-gray-200 hover:text-primary px-4 py-2  border rounded-full shadow"
    >
      <MdCloudUpload size={20} />
      <span>Upload</span>
    </Link>
  );
}

export default UploadButton;
