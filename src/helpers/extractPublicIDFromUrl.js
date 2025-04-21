export function extractPublicIdFromUrl(url) {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts.pop(); // vdnxhwnrbydx9mtq32re.mp4
  return filename.split(".")[0]; // vdnxhwnrbydx9mtq32re
}
