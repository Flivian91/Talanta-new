import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  try {
    const { asset_id } = params;

    if (!asset_id) {
      return new NextResponse(
        JSON.stringify({ message: "Asset ID is required" }),
        { status: 400 }
      );
    }

    // Fetch media information from Cloudinary
    const media = await cloudinary.api.resource(asset_id);
    if (!media) {
      return new NextResponse(JSON.stringify({ message: "Media not found" }), {
        status: 404,
      });
    }    

    return new NextResponse(JSON.stringify(media), { status: 200 });
  } catch (error) {
    console.error("Cloudinary Fetch Error:", error);
    return new NextResponse(JSON.stringify({ message: "Media not found" }), {
      status: 404,
    });
  }
}
