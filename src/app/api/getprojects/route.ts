import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  description: string;
  raised?: number; // Optional
  contributors?: number;
  projectPics?: string[];
  links?: {
    telegram: string | null; // Allow null
    x: string | null;        // Allow null
    discord: string | null;  // Allow null
    website: string | null;  // Allow null
  }[]; // Update to reflect the array of links
};

// API Route to get projects
export async function GET(req: NextRequest) {
  try {
    const result: Project[] = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        tagline: true,
        category: true,
        logo: true,
        description: true,
        projectPics: true,
        links: { // Include links relation
          select: {
            telegram: true,
            x: true,
            discord: true,
            website: true,
          },
        },
      },
      where: {
        status: "ACCEPTED",
      },
    });

    return Response.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
