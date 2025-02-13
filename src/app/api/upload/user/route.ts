import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let newUser = await prisma.user.findUnique({
      where: { id: body.address },
    });

    if (!newUser) {
      newUser = await prisma.user.create({
        data: { id: body.address },
      });
    }

    return NextResponse.json({
      success: true,
      message: "User Created! successfully!",
      project: newUser,
    });
  } catch (error) {
    console.error("Error uploading project:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
