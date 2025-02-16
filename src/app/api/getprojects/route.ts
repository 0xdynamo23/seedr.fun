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
  projectPics?: string[]
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
