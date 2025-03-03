import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

/*asset_folder
: 
""
asset_id
: 
"9ca3a7e2f6394403b3d307f841e7998e"
batchId
: 
"uw-batch2"
bytes
: 
11068
created_at
: 
"2025-03-03T06:49:52Z"
display_name
: 
"profile"
etag
: 
"619f3374aec640ba4c41b13561e289e9"
format
: 
"webp"
height
: 
490
id
: 
"uw-file3"
original_filename
: 
"profile"
pages
: 
1
path
: 
"v1740984592/ola1aptfy8vvh9klkr9l.webp"
placeholder
: 
false
public_id
: 
"ola1aptfy8vvh9klkr9l"
resource_type
: 
"image"
secure_url
: 
"https://res.cloudinary.com/talanta-mines/image/upload/v1740984592/ola1aptfy8vvh9klkr9l.webp"
signature
: 
"2e40150b49413b9533a25e6ead341dd0f90b6402"
tags
: 
[]
thumbnail_url
: 
"https://res.cloudinary.com/talanta-mines/image/upload/c_limit,h_60,w_90/v1740984592/ola1aptfy8vvh9klkr9l.jpg"
type
: 
"upload"
url
: 
"http://res.cloudinary.com/talanta-mines/image/upload/v1740984592/ola1aptfy8vvh9klkr9l.webp"
version
: 
1740984592
version_id
: 
"9c330433a53177d133b90ff4e08087b1"
width
: 
612*/
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
    console.log(media);
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
