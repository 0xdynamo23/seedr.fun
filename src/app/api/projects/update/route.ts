import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { projectId, status } = await req.json();

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Verify database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    // First check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      console.error(`Project with ID ${projectId} not found`);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    console.log(`Project ${projectId} status updated to ${status}`);
    return NextResponse.json({ 
      message: "Project status updated successfully",
      project: updatedProject 
    });
  } catch (error) {
    console.error("Detailed error updating project status:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ 
      error: "Failed to update project status",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
