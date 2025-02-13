import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { projectId, status } = await req.json();

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    return NextResponse.json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json({ error: "Failed to update project status" }, { status: 500 });
  }
}
