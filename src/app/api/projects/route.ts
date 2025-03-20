import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/projects?ownerId={bech32Address} - Fetch projects by owner ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json({ error: "Owner ID is required" }, { status: 400 });
    }

    const projects = await prisma.project.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
