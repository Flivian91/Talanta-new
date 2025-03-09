import cloudinary from "@/utils/cloudinary";

export async function GET(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Get the last URL segment

    if (!id) {
      return new Response(JSON.stringify({ message: "Asset ID is required" }), {
        status: 400,
      });
    }

    console.log("Fetching Media for Asset ID:", id);

    // Cloudinary Search API to find by `asset_id`
    const result = await cloudinary.api
      .resource("day3wumvairfiyxbzzmp")
      .then((results) => console.log("Result:", results));
    if (!result.resources.length) {
      return new Response(JSON.stringify({ message: "Media not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result.resources[0]), { status: 200 });
  } catch (error) {
    console.error("Cloudinary Fetch Error:", error);
    return new Response(JSON.stringify({ message: "Server Error", error }), {
      status: 500,
    });
  }
}
