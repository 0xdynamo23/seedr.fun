import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY,
});

export function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
          { timestamp },
          process.env.CLOUDINARY_SECRETKEY as string
        );
    
        return NextResponse.json({
          timestamp,
          signature,
          api_key: process.env.CLOUDINARY_APIKEY,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
    }
}
