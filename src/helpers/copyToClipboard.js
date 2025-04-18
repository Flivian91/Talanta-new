import { toast } from "react-toastify";

export function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("📋 Copied to clipboard!");
    })
    .catch(() => {
      toast.error("❌ Failed to copy");
    });
}
