import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/projects - Fetch all projects for admin
export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
